'use client'
// InitializedMDXEditor.tsx
import type { ForwardedRef } from 'react'

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

    // ChangeAdmonitionType,

    ChangeCodeMirrorLanguage,

    CodeToggle,

    CreateLink,

    // DiffSourceToggleWrapper,

    InsertAdmonition,

    InsertCodeBlock,

    // InsertFrontmatter,

    // InsertImage,

    // InsertSandpack,

    InsertTable,

    InsertThematicBreak,

    ListsToggle,

    ShowSandpackInfo,

    directivesPlugin,

    AdmonitionDirectiveDescriptor,

    linkPlugin,

    linkDialogPlugin,

    imagePlugin,

    tablePlugin,

    codeBlockPlugin,

    sandpackPlugin,

    codeMirrorPlugin,

    SandpackConfig,

    DiffSourceToggleWrapper,

    ConditionalContents,

    frontmatterPlugin,

    useTranslation,

    HighlightToggle,

    DirectiveDescriptor,

    GenericDirectiveEditor,

    usePublisher,

    insertDirective$,

    Button as MDXButton,

} from '@mdxeditor/editor'

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
                directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
                headingsPlugin(),
                listsPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                diffSourcePlugin(),
                listsPlugin(),
                headingsPlugin(),
                quotePlugin(),
                markdownShortcutPlugin(),
                tablePlugin(),
                // imagePlugin({ imageUploadHandler }),
                codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                // sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
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