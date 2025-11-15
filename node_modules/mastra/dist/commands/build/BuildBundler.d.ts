import { Bundler } from '@mastra/deployer/bundler';
export declare class BuildBundler extends Bundler {
    private customEnvFile?;
    constructor(customEnvFile?: string);
    getEnvFiles(): Promise<string[]>;
    prepare(outputDirectory: string): Promise<void>;
    bundle(entryFile: string, outputDirectory: string, toolsPaths: (string | string[])[]): Promise<void>;
    protected getEntry(): string;
    lint(entryFile: string, outputDirectory: string, toolsPaths: (string | string[])[]): Promise<void>;
}
//# sourceMappingURL=BuildBundler.d.ts.map