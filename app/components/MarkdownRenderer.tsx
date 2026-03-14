import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Em, Heading, Link, Quote, Table, Text } from '@radix-ui/themes';

export function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div className="prose dark:prose-invert w-full max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
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
                                {props.children}
                            </Link>
                        )
                    },
                    blockquote(props) {
                        return (
                            <Quote>
                                {props.children}
                            </Quote>
                        );
                    },
                    em(props) {
                        return <Em>{props.children}</Em>;
                    },
                    h1(props) {
                        return <Heading as="h1">{props.children}</Heading>;
                    },
                    h2(props) {
                        return <Heading as="h2">{props.children}</Heading>;
                    },
                    h3(props) {
                        return <Heading as="h3">{props.children}</Heading>;
                    },
                    h4(props) {
                        return <Heading as="h4">{props.children}</Heading>;
                    },
                    h5(props) {
                        return <Heading as="h5">{props.children}</Heading>;
                    },
                    h6(props) {
                        return <Heading as="h6">{props.children}</Heading>;
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
