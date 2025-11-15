import type { IMastraLogger } from '@mastra/core/logger';
type WorkspacePackageInfo = {
    location: string;
    dependencies: Record<string, string> | undefined;
    version: string | undefined;
};
type TransitiveDependencyResult = {
    resolutions: Record<string, string>;
    usedWorkspacePackages: Set<string>;
};
/**
 * Creates a map of workspace packages with their metadata for dependency resolution
 * @returns Map of package names to their location, dependencies and version
 */
export declare const createWorkspacePackageMap: () => Promise<Map<string, {
    location: string;
    dependencies: Record<string, string> | undefined;
    version: string | undefined;
}>>;
/**
 * Collects all transitive workspace dependencies and their TGZ paths
 */
export declare const collectTransitiveWorkspaceDependencies: ({ workspaceMap, initialDependencies, logger, }: {
    workspaceMap: Map<string, WorkspacePackageInfo>;
    initialDependencies: Set<string>;
    logger: IMastraLogger;
}) => TransitiveDependencyResult;
/**
 * Creates TGZ packages for workspace dependencies in the workspace-module directory
 */
export declare const packWorkspaceDependencies: ({ workspaceMap, usedWorkspacePackages, bundleOutputDir, logger, }: {
    workspaceMap: Map<string, WorkspacePackageInfo>;
    bundleOutputDir: string;
    logger: IMastraLogger;
    usedWorkspacePackages: Set<string>;
}) => Promise<void>;
export {};
//# sourceMappingURL=workspaceDependencies.d.ts.map