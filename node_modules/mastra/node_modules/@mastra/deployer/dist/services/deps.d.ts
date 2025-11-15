import { MastraBase } from '@mastra/core/base';
interface ArchitectureOptions {
    os?: string[];
    cpu?: string[];
    libc?: string[];
}
export declare class Deps extends MastraBase {
    private packageManager;
    private rootDir;
    constructor(rootDir?: string);
    private findLockFile;
    private getPackageManager;
    getWorkspaceDependencyPath({ pkgName, version }: {
        pkgName: string;
        version: string;
    }): string;
    pack({ dir, destination }: {
        dir: string;
        destination: string;
    }): Promise<unknown>;
    private writePnpmConfig;
    private writeYarnConfig;
    private getNpmArgs;
    install({ dir, architecture, }?: {
        dir?: string;
        architecture?: ArchitectureOptions;
    }): Promise<unknown>;
    installPackages(packages: string[]): Promise<unknown>;
    checkDependencies(dependencies: string[]): Promise<string>;
    getProjectName(): Promise<any>;
    getPackageVersion(): Promise<string | undefined>;
    addScriptsToPackageJson(scripts: Record<string, string>): Promise<void>;
}
export declare class DepsService extends Deps {
}
export {};
//# sourceMappingURL=deps.d.ts.map