"use client";

import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import { Blockquote, Box, Button, Callout, Card, Dialog, Em, Flex, Heading, Link, RadioGroup, Section, Table, Text } from '@radix-ui/themes';
import { ExternalLinkIcon, InfoCircledIcon, PlayIcon } from '@radix-ui/react-icons';

type QuizQuestion = {
    prompt: string;
    options: string[];
    correctOptionIndex: number;
    correctMessage: string;
    wrongMessage: string;
};

type LegacyQuizDirectivePayload = {
    correctMessage?: string;
    wrongMessage?: string;
    questions: Array<{
        prompt: string;
        options: string[];
        correctOptionIndex: number;
        correctMessage?: string;
        wrongMessage?: string;
    }>;
};

type QuizDirectivePayload = {
    questions: QuizQuestion[];
};

function decodeBase64Utf8(value: string) {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

function parseQuizDirectivePayload(rawPayload: string): QuizDirectivePayload | null {
    try {
        const decoded = decodeBase64Utf8(rawPayload);
        const parsed = JSON.parse(decoded) as LegacyQuizDirectivePayload;

        if (!Array.isArray(parsed.questions)) {
            return null;
        }

        const legacyCorrect = typeof parsed.correctMessage === 'string' ? parsed.correctMessage : 'Correct answer!';
        const legacyWrong = typeof parsed.wrongMessage === 'string' ? parsed.wrongMessage : 'Wrong answer, try again.';

        return {
            questions: parsed.questions
                .filter((question) =>
                    question &&
                    typeof question.prompt === 'string' &&
                    Array.isArray(question.options) &&
                    typeof question.correctOptionIndex === 'number'
                )
                .map((question) => ({
                    prompt: question.prompt,
                    options: question.options.filter((option) => typeof option === 'string'),
                    correctOptionIndex: question.correctOptionIndex,
                    correctMessage: typeof question.correctMessage === 'string' ? question.correctMessage : legacyCorrect,
                    wrongMessage: typeof question.wrongMessage === 'string' ? question.wrongMessage : legacyWrong,
                })),
        };
    } catch {
        return null;
    }
}

function QuizDirectiveBlock({ payload }: { payload: string }) {
    const quiz = useMemo(() => parseQuizDirectivePayload(payload), [payload]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedByQuestion, setSelectedByQuestion] = useState<Record<number, number>>({});
    const [feedbackByQuestion, setFeedbackByQuestion] = useState<Record<number, 'correct' | 'wrong'>>({});

    if (!quiz || quiz.questions.length === 0) {
        return (
            <Callout.Root color="red" className="not-prose my-4">
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>Invalid quiz directive payload.</Callout.Text>
            </Callout.Root>
        );
    }

    // Quiz is guaranteed to be non-null after this point
    const quizData = quiz;

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const selected = selectedByQuestion[currentQuestionIndex];
    const feedback = feedbackByQuestion[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

    function updateSelection(value: string) {
        setSelectedByQuestion((current) => ({
            ...current,
            [currentQuestionIndex]: Number(value),
        }));
    }

    function checkAnswer() {
        if (selected === undefined) {
            return;
        }

        setFeedbackByQuestion((current) => ({
            ...current,
            [currentQuestionIndex]: selected === currentQuestion.correctOptionIndex ? 'correct' : 'wrong',
        }));
    }

    function goToPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    }

    function goToNextQuestion() {
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }

    return (
        <Flex direction="column" align="center" className="not-prose my-4">
            <Text>
                Haz clic en el botón para iniciar el quiz. Podrás navegar entre las preguntas usando los botones "Previous" y "Next". Al finalizar, haz clic en "Finish" para cerrar el quiz. ¡Buena suerte!
            </Text>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>
                        Iniciar Quiz
                        <PlayIcon />
                    </Button>
                </Dialog.Trigger>
                <Dialog.Content maxWidth="600px">
                    <Dialog.Title>Quiz - Pregunta {currentQuestionIndex + 1} de {quizData.questions.length}</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        {currentQuestion.prompt}
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <RadioGroup.Root
                            value={selected === undefined ? '' : String(selected)}
                            onValueChange={(value) => updateSelection(value)}
                        >
                            <Flex direction="column" gap="2">
                                {currentQuestion.options.map((option: string, optionIndex: number) => (
                                    <Flex key={optionIndex} align="center" gap="2">
                                        <RadioGroup.Item value={String(optionIndex)} />
                                        <Text>{option}</Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </RadioGroup.Root>

                        <Flex align="center" gap="2">
                            <Button type="button" onClick={checkAnswer}>
                                Check answer
                            </Button>
                            {feedback ? (
                                <Text color={feedback === 'correct' ? 'green' : 'red'}>
                                    {feedback === 'correct' ? currentQuestion.correctMessage : currentQuestion.wrongMessage}
                                </Text>
                            ) : null}
                        </Flex>

                        <Flex gap="2" mt="4" justify="between">
                            <Button
                                type="button"
                                variant="soft"
                                color="gray"
                                onClick={goToPreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </Button>
                            <Flex gap="2">
                                {isLastQuestion ? (
                                    <Dialog.Close>
                                        <Button type="button">
                                            Finish
                                        </Button>
                                    </Dialog.Close>
                                ) : (
                                    <Button type="button" onClick={goToNextQuestion}>
                                        Next
                                    </Button>
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </Flex>
    );
}

// const ADMONITION_STYLES: Record<string, { border: string; bg: string; title: string }> = {
//     note:    { border: 'border-blue-500',  bg: 'bg-blue-50 dark:bg-blue-950',   title: 'Note' },
//     info:    { border: 'border-blue-500',  bg: 'bg-blue-50 dark:bg-blue-950',   title: 'Info' },
//     tip:     { border: 'border-green-500', bg: 'bg-green-50 dark:bg-green-950', title: 'Tip' },
//     warning: { border: 'border-amber-500', bg: 'bg-amber-50 dark:bg-amber-950', title: 'Warning' },
//     danger:  { border: 'border-red-500',   bg: 'bg-red-50 dark:bg-red-950',     title: 'Danger' },
//     caution: { border: 'border-red-500',   bg: 'bg-red-50 dark:bg-red-950',     title: 'Caution' },
// };

function remarkAdmonitions() {
    return (tree: any) => {
        visit(tree, (node: any) => {
            if (node.type === 'containerDirective') {
                const data = node.data || (node.data = {});
                data.hName = 'div';
                data.hProperties = { 'data-admonition': node.name };
            }

            if (node.type === 'leafDirective' && node.name === 'youtube') {
                const data = node.data || (node.data = {});
                const videoId = node.attributes?.id;

                if (typeof videoId === 'string' && videoId.length > 0) {
                    data.hName = 'div';
                    data.hProperties = { 'data-youtube-id': videoId };
                }
            }

            if (node.type === 'leafDirective' && node.name === 'quiz') {
                const data = node.data || (node.data = {});
                const payload = node.attributes?.data;

                if (typeof payload === 'string' && payload.length > 0) {
                    data.hName = 'div';
                    data.hProperties = { 'data-quiz-payload': payload };
                }
            }
        });
    };
}

export function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div className="prose dark:prose-invert w-full max-w-none space-y-10">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkDirective, remarkAdmonitions]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    div(props) {
                        const { 'data-admonition': type, 'data-youtube-id': youtubeId, 'data-quiz-payload': quizPayload, children, ...rest } = props as any;

                        if (quizPayload) {
                            return <QuizDirectiveBlock payload={String(quizPayload)} />;
                        }

                        if (youtubeId) {
                            return (
                                <Box className="not-prose my-4">
                                    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${youtubeId}`}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                width: '100%',
                                                height: '100%',
                                                border: 0,
                                                borderRadius: '12px',
                                            }}
                                        />
                                    </div>
                                </Box>
                            )
                        }

                        if (type) {
                            // const style = ADMONITION_STYLES[type] ?? { border: 'border-gray-500', bg: 'bg-gray-50 dark:bg-gray-950', title: type };
                            // return (
                            //     <div className={`not-prose border-l-4 rounded-r-md p-4 my-2 ${style.border} ${style.bg}`}>
                            //         <div className="font-semibold capitalize mb-1">{style.title}</div>
                            //         <div>{children}</div>
                            //     </div>
                            // );

                            return (
                                <Callout.Root color={
                                    type === 'note' ? 'blue' :
                                        type === 'tip' ? 'green' :
                                            type === 'warning' ? 'orange' :
                                                type === 'danger' || type === 'caution' ? 'red' :
                                                    'gray'
                                }>
                                    <Callout.Icon>
                                        <InfoCircledIcon />
                                    </Callout.Icon>
                                    <Callout.Text my="-5">
                                        <Text>
                                            {children}
                                        </Text>
                                    </Callout.Text>
                                </Callout.Root>
                            )
                        }

                        return <div {...rest}>{children}</div>
                    },
                    br() {
                        return <Section size="2" />
                    },
                    table(props) {
                        return (
                            <div className="not-prose ">
                                <Table.Root variant="surface" size="2">
                                    {props.children}
                                </Table.Root>
                            </div>
                        );
                    },
                    thead(props) {
                        return <Table.Header>{props.children}</Table.Header>;
                    },
                    tbody(props) {
                        return <Table.Body>{props.children}</Table.Body>;
                    },
                    tr(props) {
                        return <Table.Row>{props.children}</Table.Row>;
                    },
                    th(props) {
                        return <Table.ColumnHeaderCell>{props.children}</Table.ColumnHeaderCell>;
                    },
                    td(props) {
                        return <Table.Cell>{props.children}</Table.Cell>;
                    },
                    a(props) {
                        return (
                            <Link href={props.href} target="_blank" rel="noopener noreferrer">
                                <Flex align="center" gap="1">
                                    {props.children}
                                    <ExternalLinkIcon />
                                </Flex>
                            </Link>
                        )
                    },
                    blockquote(props) {
                        return (
                            <Blockquote>
                                {props.children}
                            </Blockquote>
                        );
                    },
                    em(props) {
                        return <Em>{props.children}</Em>;
                    },
                    h1(props) {
                        return <Heading as="h1" id={props?.children?.toString().toLowerCase().replace(/\s+/g, '-')}>{props.children}</Heading>;
                    },
                    h2(props) {
                        return <Heading as="h2" id={props?.children?.toString().toLowerCase().replace(/\s+/g, '-')}>{props.children}</Heading>;
                    },
                    h3(props) {
                        return <Heading as="h3" id={props?.children?.toString().toLowerCase().replace(/\s+/g, '-')}>{props.children}</Heading>;
                    },
                    h4(props) {
                        return <Heading as="h4" id={props?.children?.toString().toLowerCase().replace(/\s+/g, '-')}>{props.children}</Heading>;
                    },
                    h5(props) {
                        return <Heading as="h5" id={props?.children?.toString().toLowerCase().replace(/\s+/g, '-')}>{props.children}</Heading>;
                    },
                    h6(props) {
                        return <Heading as="h6" id={props?.children?.toString().toLowerCase().replace(/\s+/g, '-')}>{props.children}</Heading>;
                    },
                    text(props) {
                        return <Text>{props.children}</Text>;
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div >
    );
}
