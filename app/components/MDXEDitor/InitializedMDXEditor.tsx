'use client'
// InitializedMDXEditor.tsx
import type { ForwardedRef } from 'react'
import { useState } from 'react'
import { Box, Button, Card, Dialog, Flex, Heading, RadioGroup, ScrollArea, Text, TextArea, TextField } from '@radix-ui/themes'

import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    diffSourcePlugin,
    MDXEditor,
    type MDXEditorMethods,
    type MDXEditorProps,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    ChangeCodeMirrorLanguage,
    CodeToggle,
    CreateLink,
    InsertAdmonition,
    InsertCodeBlock,
    InsertTable,
    InsertThematicBreak,
    ListsToggle,
    ShowSandpackInfo,
    directivesPlugin,
    AdmonitionDirectiveDescriptor,
    linkPlugin,
    linkDialogPlugin,
    tablePlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    DiffSourceToggleWrapper,
    ConditionalContents,
    frontmatterPlugin,
    HighlightToggle,
    DirectiveDescriptor,
    GenericDirectiveEditor,
    usePublisher,
    insertMarkdown$,
    Button as MDXButton,
} from '@mdxeditor/editor'

type QuizQuestion = {
    prompt: string
    options: string[]
    correctOptionIndex: number
    correctMessage: string
    wrongMessage: string
}

type QuizDirectivePayload = {
    questions: QuizQuestion[]
}

function createQuestion(): QuizQuestion {
    return {
        prompt: '',
        options: ['', ''],
        correctOptionIndex: 0,
        correctMessage: 'Correct answer!',
        wrongMessage: 'Wrong answer, try again.',
    }
}

function encodeBase64Utf8(value: string) {
    const bytes = new TextEncoder().encode(value)
    let binary = ''

    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte)
    })

    return btoa(binary)
}

function buildQuizDirectiveMarkdown(questions: QuizQuestion[]) {
    const validQuestions = questions
        .map((question) => ({
            prompt: question.prompt.trim(),
            options: question.options.map((option) => option.trim()).filter(Boolean),
            correctOptionIndex: question.correctOptionIndex,
            correctMessage: question.correctMessage.trim() || 'Correct answer!',
            wrongMessage: question.wrongMessage.trim() || 'Wrong answer, try again.',
        }))
        .filter((question) => question.prompt.length > 0 && question.options.length >= 2)

    if (validQuestions.length === 0) {
        return ''
    }

    const payload: QuizDirectivePayload = {
        questions: validQuestions,
    }

    const encodedPayload = encodeBase64Utf8(JSON.stringify(payload))

    return `::quiz{data="${encodedPayload}"}`
}

function extractYouTubeVideoId(value: string) {
    const input = value.trim()

    if (!input) {
        return null
    }

    const directIdRegex = /^[a-zA-Z0-9_-]{11}$/
    if (directIdRegex.test(input)) {
        return input
    }

    try {
        const url = new URL(input)

        if (url.hostname.includes('youtu.be')) {
            const pathId = url.pathname.split('/').filter(Boolean)[0]
            return pathId && directIdRegex.test(pathId) ? pathId : null
        }

        if (url.hostname.includes('youtube.com')) {
            const videoId = url.searchParams.get('v')

            if (videoId && directIdRegex.test(videoId)) {
                return videoId
            }

            const shortsId = url.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/)
            if (shortsId?.[1]) {
                return shortsId[1]
            }

            const embedId = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/)
            if (embedId?.[1]) {
                return embedId[1]
            }
        }
    } catch {
        return null
    }

    return null
}

const YoutubeDirectiveDescriptor: DirectiveDescriptor = {
    name: 'youtube',
    testNode(node) {
        return node.name === 'youtube'
    },
    attributes: ['id'],
    hasChildren: false,
    type: 'leafDirective',
    Editor: GenericDirectiveEditor,
}

const QuizDirectiveDescriptor: DirectiveDescriptor = {
    name: 'quiz',
    testNode(node) {
        return node.name === 'quiz'
    },
    attributes: ['data'],
    hasChildren: false,
    type: 'leafDirective',
    Editor: GenericDirectiveEditor,
}

function InsertQuizButton() {
    const insertMarkdown = usePublisher(insertMarkdown$)
    const [open, setOpen] = useState(false)
    const [questions, setQuestions] = useState<QuizQuestion[]>([createQuestion()])

    function updateQuestionPrompt(questionIndex: number, value: string) {
        setQuestions((currentQuestions) =>
            currentQuestions.map((question, currentIndex) =>
                currentIndex === questionIndex ? { ...question, prompt: value } : question
            )
        )
    }

    function updateOption(questionIndex: number, optionIndex: number, value: string) {
        setQuestions((currentQuestions) =>
            currentQuestions.map((question, currentIndex) => {
                if (currentIndex !== questionIndex) {
                    return question
                }

                return {
                    ...question,
                    options: question.options.map((option, currentOptionIndex) =>
                        currentOptionIndex === optionIndex ? value : option
                    ),
                }
            })
        )
    }

    function addQuestion() {
        setQuestions((currentQuestions) => [...currentQuestions, createQuestion()])
    }

    function removeQuestion(questionIndex: number) {
        setQuestions((currentQuestions) => {
            if (currentQuestions.length === 1) {
                return currentQuestions
            }

            return currentQuestions.filter((_, currentIndex) => currentIndex !== questionIndex)
        })
    }

    function addOption(questionIndex: number) {
        setQuestions((currentQuestions) =>
            currentQuestions.map((question, currentIndex) => {
                if (currentIndex !== questionIndex) {
                    return question
                }

                return {
                    ...question,
                    options: [...question.options, ''],
                }
            })
        )
    }

    function removeOption(questionIndex: number, optionIndex: number) {
        setQuestions((currentQuestions) =>
            currentQuestions.map((question, currentIndex) => {
                if (currentIndex !== questionIndex || question.options.length <= 2) {
                    return question
                }

                const filteredOptions = question.options.filter((_, currentOptionIndex) => currentOptionIndex !== optionIndex)
                const nextCorrectOptionIndex = Math.max(0, Math.min(question.correctOptionIndex, filteredOptions.length - 1))

                return {
                    ...question,
                    options: filteredOptions,
                    correctOptionIndex: nextCorrectOptionIndex,
                }
            })
        )
    }

    function setCorrectOption(questionIndex: number, optionIndex: number) {
        setQuestions((currentQuestions) =>
            currentQuestions.map((question, currentIndex) =>
                currentIndex === questionIndex ? { ...question, correctOptionIndex: optionIndex } : question
            )
        )
    }

    function updateQuestionMessages(questionIndex: number, nextValues: { correctMessage?: string; wrongMessage?: string }) {
        setQuestions((currentQuestions) =>
            currentQuestions.map((question, currentIndex) => {
                if (currentIndex !== questionIndex) {
                    return question
                }

                return {
                    ...question,
                    correctMessage: nextValues.correctMessage ?? question.correctMessage,
                    wrongMessage: nextValues.wrongMessage ?? question.wrongMessage,
                }
            })
        )
    }

    function resetAndClose() {
        setOpen(false)
        setQuestions([createQuestion()])
    }

    function handleInsertQuiz() {
        const markdown = buildQuizDirectiveMarkdown(questions)

        if (!markdown) {
            return
        }

        insertMarkdown(`\n\n${markdown}\n\n`)
        resetAndClose()
    }

    return (
        <>
            <MDXButton type="button" onClick={() => setOpen(true)}>
                Quiz
            </MDXButton>

            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Content maxWidth="780px">
                    <Dialog.Title>Add quiz</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Add one or more single-choice questions and insert them into the editor.
                    </Dialog.Description>

                    <ScrollArea type="always" scrollbars="vertical" style={{ maxHeight: '60vh' }}>
                        <Flex direction="column" gap="3">
                            {questions.map((question, questionIndex) => (
                                <Card key={questionIndex} size="2">
                                    <Flex direction="column" gap="3">
                                        <Flex justify="between" align="center" gap="2">
                                            <Heading as="h4" size="3">Question {questionIndex + 1}</Heading>
                                            <Button
                                                type="button"
                                                variant="soft"
                                                color="gray"
                                                onClick={() => removeQuestion(questionIndex)}
                                                disabled={questions.length === 1}
                                            >
                                                Remove
                                            </Button>
                                        </Flex>

                                        <TextArea
                                            value={question.prompt}
                                            onChange={(event) => updateQuestionPrompt(questionIndex, event.target.value)}
                                            placeholder="Question prompt"
                                            rows={4}
                                        />

                                        <Flex direction="column" gap="2">
                                            <Text size="2" weight="medium">Feedback messages for this question</Text>
                                            <TextField.Root
                                                value={question.correctMessage}
                                                onChange={(event) => updateQuestionMessages(questionIndex, { correctMessage: event.target.value })}
                                                placeholder="Message for a correct answer"
                                            />
                                            <TextField.Root
                                                value={question.wrongMessage}
                                                onChange={(event) => updateQuestionMessages(questionIndex, { wrongMessage: event.target.value })}
                                                placeholder="Message for a wrong answer"
                                            />
                                        </Flex>

                                        <RadioGroup.Root
                                            value={String(question.correctOptionIndex)}
                                            onValueChange={(value) => setCorrectOption(questionIndex, Number(value))}
                                        >
                                            <Flex direction="column" gap="2">
                                                {question.options.map((option, optionIndex) => (
                                                    <Flex key={optionIndex} align="center" gap="2">
                                                        <RadioGroup.Item value={String(optionIndex)} />
                                                        <Box style={{ flex: 1 }}>
                                                            <TextField.Root
                                                                value={option}
                                                                onChange={(event) => updateOption(questionIndex, optionIndex, event.target.value)}
                                                                placeholder={`Option ${optionIndex + 1}`}
                                                            />
                                                        </Box>
                                                        <Button
                                                            type="button"
                                                            variant="soft"
                                                            color="gray"
                                                            onClick={() => removeOption(questionIndex, optionIndex)}
                                                            disabled={question.options.length <= 2}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Flex>
                                                ))}
                                            </Flex>
                                        </RadioGroup.Root>

                                        <Flex>
                                            <Button type="button" variant="outline" onClick={() => addOption(questionIndex)}>
                                                Add option
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Card>
                            ))}
                        </Flex>
                    </ScrollArea>

                    <Flex gap="2" mt="4" justify="end" wrap="wrap">
                        <Button type="button" variant="soft" onClick={addQuestion}>Add question</Button>
                        <Dialog.Close>
                            <Button type="button" variant="soft" color="gray" onClick={resetAndClose}>Cancel</Button>
                        </Dialog.Close>
                        <Button type="button" onClick={handleInsertQuiz}>Insert quiz</Button>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </>
    )
}

function InsertYouTubeButton() {
    const insertMarkdown = usePublisher(insertMarkdown$)
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const [error, setError] = useState('')

    function resetAndClose() {
        setOpen(false)
        setInput('')
        setError('')
    }

    function handleInsert() {
        const videoId = extractYouTubeVideoId(input)

        if (!videoId) {
            setError('Enter a valid YouTube URL or video id.')
            return
        }

        insertMarkdown(`\n\n::youtube{id="${videoId}"}\n\n`)
        resetAndClose()
    }

    return (
        <>
            <MDXButton type="button" onClick={() => setOpen(true)}>
                YouTube
            </MDXButton>

            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Content maxWidth="520px">
                    <Dialog.Title>Insert YouTube video</Dialog.Title>
                    <Dialog.Description size="2" mb="3">
                        Paste a YouTube URL or an 11-character video id.
                    </Dialog.Description>

                    <Flex direction="column" gap="2">
                        <TextField.Root
                            value={input}
                            onChange={(event) => {
                                setInput(event.target.value)
                                if (error) {
                                    setError('')
                                }
                            }}
                            placeholder="https://www.youtube.com/watch?v=..."
                        />
                        {error ? <Text color="red" size="1">{error}</Text> : null}
                    </Flex>

                    <Flex gap="2" mt="4" justify="end">
                        <Dialog.Close>
                            <Button type="button" variant="soft" color="gray" onClick={resetAndClose}>Cancel</Button>
                        </Dialog.Close>
                        <Button type="button" onClick={handleInsert}>Insert</Button>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </>
    )
}

// Only import this to the next file
export default function InitializedMDXEditor({
    editorRef,
    ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
    return (
        <MDXEditor
            {...props}
            ref={editorRef}
            // translation={(key, defaultValue, interpolations) => { return t(key, defaultValue, interpolations) }}
            plugins={[
                directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor, YoutubeDirectiveDescriptor, QuizDirectiveDescriptor] }),
                headingsPlugin(),
                listsPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                diffSourcePlugin(),
                tablePlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', ts: 'TypeScript', c: 'C', cpp: 'C++' } }),
                frontmatterPlugin(),
                toolbarPlugin({
                    toolbarClassName: 'w-full',
                    toolbarContents: () => (
                        <DiffSourceToggleWrapper>
                            <UndoRedo />
                            <BoldItalicUnderlineToggles />
                            <BlockTypeSelect />
                            <ListsToggle />
                            <InsertAdmonition />
                            <HighlightToggle />
                            <CodeToggle />
                            <InsertTable />
                            <InsertThematicBreak />
                            <CreateLink />
                            <InsertQuizButton />
                            <InsertYouTubeButton />
                            <ConditionalContents
                                options={[
                                    { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                                    { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                                    {
                                        fallback: () => (
                                            <>
                                                <InsertCodeBlock />
                                            </>
                                        )
                                    }
                                ]}
                            />
                        </DiffSourceToggleWrapper>
                    )
                })
            ]}
        />
    )
}