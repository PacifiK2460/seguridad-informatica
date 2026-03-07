export interface Chapter {
    title: string;
    content: string;
}

/**
 * Parses markdown content into chapters.
 * Each chapter starts with a level 1 heading (# Title) and ends with '***'
 */
export function parseChapters(content: string): Chapter[] {
    if (!content) {
        return [];
    }

    const chapters: Chapter[] = [];

    // Split by *** to get chapter boundaries
    const sections = content.split('***').filter(section => section.trim());

    for (const section of sections) {
        const trimmedSection = section.trim();

        // Check if section starts with a level 1 heading (handle both \n and \r\n)
        const headingMatch = trimmedSection.match(/^#\s+(.+?)(?:\r?\n|$)/);

        if (headingMatch) {
            const title = headingMatch[1].trim();
            // Get content after the heading
            const contentAfterHeading = trimmedSection.substring(headingMatch[0].length).trim();

            chapters.push({
                title,
                content: contentAfterHeading,
            });
        } else {
            // If no heading found, treat entire section as content with empty title
            chapters.push({
                title: '',
                content: trimmedSection,
            });
        }
    }

    // Add a hardcoded chapter title for the first chapter if it doesn't have one
    if (chapters.length > 0 && !chapters[0].title) {
        chapters[0].title = 'Introduction';
    }

    return chapters;
}
