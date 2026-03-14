"use client"

import { useRouter } from 'next/navigation'
import { fromMarkdown } from 'react-markdown-toc'
import { TOC } from 'react-markdown-toc/client'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/app/components/collapsible'
import Link from 'next/link'
import { ChevronDownIcon, Flex } from '@radix-ui/themes'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

export function ContentTOC({ markdownString }: { markdownString: string }) {
    const router = useRouter()
    const toc = fromMarkdown(markdownString)

    console.log('Generated TOC:', toc)

    return (
        <TOC
            toc={toc}
            scrollAlign='start'
            renderList={children => (
                <CollapsibleContent className='pl-4 overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up'>
                    {children}
                </CollapsibleContent>
            )}
            renderListItem={(children, open) => <Collapsible open={open}>
                <Flex direction="row" align="center" gap="2" justify="start" className='w-full cursor-pointer hover:font-bold animate-all fade-in fade-out duration-500'>
                    <ChevronRightIcon className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
                    <Flex direction="column" align="start" gap="2">
                        {children}
                    </Flex>
                </Flex>
            </Collapsible>}
            renderLink={(children, href, active) => (
                <CollapsibleTrigger className='hover:font-bold animate-all fade-in fade-out duration-500'>
                    <Link href={href} target="_self" scroll className={`block w-full text-left ${active ? 'font-bold' : ''}`}>
                        {children}
                    </Link>
                </CollapsibleTrigger>
            )}
        />
    )
}