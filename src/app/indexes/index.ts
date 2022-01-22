export class Author {
    constructor(public readonly name: string,
                public readonly contacts: Array<string>) {
    }
}

export class DateMetadata {
    constructor(public readonly date: Date,
                public readonly i_year: number,
                public readonly short_year: string,
                public readonly i_month: number,
                public readonly month: string,
                public readonly short_month: string,
                public readonly long_month: string,
                public readonly i_day: number,
                public readonly day: string,
                public readonly short_day: string,
                public readonly long_day: string,
                public readonly i_hour: number,
                public readonly i_minute: number,
                public readonly i_second: number) {}

    static fromUnknown(input: unknown): DateMetadata | undefined {
        if (input === undefined || input === null) {
            return undefined;
        }
        const raw = input as {
            timestamp: number,
            i_year: number,
            short_year: string,
            i_month: number,
            month: string,
            short_month: string,
            long_month: string,
            i_day: number,
            day: string,
            short_day: string,
            long_day: string,
            i_hour: number,
            i_minute: number,
            i_second: number
        };
        return new DateMetadata(
            new Date(raw.timestamp),
            raw.i_year,
            raw.short_year,
            raw.i_month,
            raw.month,
            raw.short_month,
            raw.long_month,
            raw.i_day,
            raw.day,
            raw.short_day,
            raw.long_day,
            raw.i_hour,
            raw.i_minute,
            raw.i_second
        )
    }
}

export class Metadata {
    constructor(public readonly title: string,
                public readonly urlTitle: string,
                public readonly summary: string,
                public readonly authors: Array<string>,
                public readonly tags: Array<string>,
                public readonly publishingDate: DateMetadata | undefined,
                public readonly lastEditDate: DateMetadata | undefined,
                public readonly data: Map<string, unknown> | undefined) { }

    static fromUnknown(input: unknown): Metadata | undefined {
        if (input === undefined || input === null) {
            return undefined;
        }
        const raw = input as {
            title: string,
            url_title: string,
            summary: string,
            authors: Array<string>,
            tags: Array<string>,
            publishing_date: unknown,
            last_edit_date: unknown,
            data: Map<string, unknown> | undefined
        };
        return new Metadata(raw.title, 
            raw.url_title, 
            raw.summary, 
            raw.authors, 
            raw.tags, 
            DateMetadata.fromUnknown(raw.publishing_date), 
            DateMetadata.fromUnknown(raw.last_edit_date),
            raw.data)
    }
}

export class Page {
    constructor(public readonly path: Array<string>,
                public readonly uri: string,
                public readonly metadata: Metadata | undefined) {
    }

    static fromUnknown(input: unknown): Page {
        const raw = input as {
            page_ref: {
                path: Array<string>
            },
            page_uri: string,
            metadata: unknown
        };
        return new Page(raw.page_ref.path, raw.page_uri, Metadata.fromUnknown(raw.metadata));
    }
}

export class PagesBundle {
    public async allPages(baseUri: string, force: boolean = false): Promise<Array<Page>> {
        const rawPages = await fetch(`${baseUri}/all_pages.json`);
        if (rawPages.ok) {
            return (await rawPages.json() as Array<unknown>).map(u => Page.fromUnknown(u))
        }
        throw new Error('cannot load pages');
    }
}