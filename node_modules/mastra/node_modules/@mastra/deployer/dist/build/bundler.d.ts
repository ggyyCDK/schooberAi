import { type InputOptions, type OutputOptions } from 'rollup';
import type { analyzeBundle } from './analyze.js';
export declare function getInputOptions(entryFile: string, analyzedBundleInfo: Awaited<ReturnType<typeof analyzeBundle>>, platform: 'node' | 'browser', env?: Record<string, string>, { sourcemap }?: {
    sourcemap?: boolean;
}): Promise<InputOptions>;
export declare function createBundler(inputOptions: InputOptions, outputOptions: Partial<OutputOptions> & {
    dir: string;
}): Promise<{
    write: () => Promise<import("rollup").RollupOutput>;
    close: () => Promise<void>;
}>;
//# sourceMappingURL=bundler.d.ts.map