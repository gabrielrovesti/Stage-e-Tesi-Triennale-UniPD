import { ImportFile } from '@resolver-engine/imports';
export declare function buildSourcesObject(files: ImportFile[]): Record<string, {
    content: string;
}>;
export declare function buildInputObject(files: ImportFile[], overrides?: any): {
    language: string;
    sources: Record<string, {
        content: string;
    }>;
    settings: any;
};
