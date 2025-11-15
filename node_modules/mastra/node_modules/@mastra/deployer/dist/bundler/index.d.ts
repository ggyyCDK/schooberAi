import { MastraBundler } from '@mastra/core/bundler';
import type { InputOptions, OutputOptions } from 'rollup';
import { analyzeBundle } from '../build/analyze.js';
export declare abstract class Bundler extends MastraBundler {
    protected analyzeOutputDir: string;
    protected outputDir: string;
    constructor(name: string, component?: 'BUNDLER' | 'DEPLOYER');
    prepare(outputDirectory: string): Promise<void>;
    writeInstrumentationFile(outputDirectory: string, customInstrumentationFile?: string): Promise<void>;
    writePackageJson(outputDirectory: string, dependencies: Map<string, string>, resolutions?: Record<string, string>): Promise<void>;
    protected createBundler(inputOptions: InputOptions, outputOptions: Partial<OutputOptions> & {
        dir: string;
    }): Promise<{
        write: () => Promise<import("rollup").RollupOutput>;
        close: () => Promise<void>;
    }>;
    protected analyze(entry: string | string[], mastraFile: string, outputDirectory: string): Promise<{
        invalidChunks: Set<string>;
        dependencies: Map<string, string>;
        externalDependencies: Set<string>;
    }>;
    protected installDependencies(outputDirectory: string, rootDir?: string): Promise<void>;
    protected copyPublic(mastraDir: string, outputDirectory: string): Promise<void>;
    protected copyDOTNPMRC({ rootDir, outputDirectory, }: {
        rootDir?: string;
        outputDirectory: string;
    }): Promise<void>;
    protected getBundlerOptions(serverFile: string, mastraEntryFile: string, analyzedBundleInfo: Awaited<ReturnType<typeof analyzeBundle>>, toolsPaths: (string | string[])[], sourcemapEnabled?: boolean): Promise<InputOptions>;
    getToolsInputOptions(toolsPaths: (string | string[])[]): Promise<Record<string, string>>;
    protected _bundle(serverFile: string, mastraEntryFile: string, outputDirectory: string, toolsPaths?: (string | string[])[], bundleLocation?: string): Promise<void>;
    lint(_entryFile: string, _outputDirectory: string, toolsPaths: (string | string[])[]): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map