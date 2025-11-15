import type { IMastraLogger } from '@mastra/core/logger';
import { type OutputAsset, type OutputChunk } from 'rollup';
/**
 * Bundles vendor dependencies identified in the analysis step.
 * Creates virtual modules for each dependency and bundles them using rollup.
 *
 * @param depsToOptimize - Map of dependencies with their exports from analyze step
 * @param outputDir - Directory where bundled files will be written
 * @param logger - Logger instance for debugging
 * @returns Object containing bundle output and reference map for validation
 */
export declare function bundleExternals(depsToOptimize: Map<string, string[]>, outputDir: string, logger: IMastraLogger, options?: {
    externals?: string[];
    transpilePackages?: string[];
    isDev?: boolean;
}): Promise<{
    output: [OutputChunk, ...(OutputAsset | OutputChunk)[]];
    reverseVirtualReferenceMap: Map<string, string>;
    usedExternals: Record<string, Record<string, string>>;
}>;
/**
 * Main bundle analysis function that orchestrates the three-step process:
 * 1. Analyze dependencies
 * 2. Bundle dependencies modules
 * 3. Validate generated bundles
 *
 * This helps identify which dependencies need to be externalized vs bundled.
 */
export declare function analyzeBundle(entries: string[], mastraEntry: string, outputDir: string, platform: 'node' | 'browser', logger: IMastraLogger, sourcemapEnabled?: boolean): Promise<{
    invalidChunks: Set<string>;
    dependencies: Map<string, string>;
    externalDependencies: Set<string>;
}>;
//# sourceMappingURL=analyze.d.ts.map