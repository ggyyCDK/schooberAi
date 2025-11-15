export declare class DepsService {
    readonly packageManager: string;
    constructor();
    private findLockFile;
    private getPackageManager;
    installPackages(packages: string[]): Promise<import("execa").Result<{
        all: true;
        shell: true;
        stdio: "inherit";
    }>>;
    checkDependencies(dependencies: string[]): Promise<string>;
    getProjectName(): Promise<any>;
    getPackageVersion(): Promise<string | undefined>;
    addScriptsToPackageJson(scripts: Record<string, string>): Promise<void>;
}
//# sourceMappingURL=service.deps.d.ts.map