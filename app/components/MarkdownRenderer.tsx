import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import { Blockquote, Callout, Em, Flex, Heading, Link, Quote, Section, Table, Text } from '@radix-ui/themes';
import { ExternalLinkIcon, InfoCircledIcon } from '@radix-ui/react-icons';

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
                        const { 'data-admonition': type, children, ...rest } = props as any;
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
