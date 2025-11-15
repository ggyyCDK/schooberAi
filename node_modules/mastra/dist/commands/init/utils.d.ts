export type LLMProvider = 'openai' | 'anthropic' | 'groq' | 'google' | 'cerebras';
export type Components = 'agents' | 'workflows' | 'tools';
export declare const getAISDKPackageVersion: (llmProvider: LLMProvider) => "^0.2.14" | "^1.0.0";
export declare const getAISDKPackage: (llmProvider: LLMProvider) => "@ai-sdk/openai" | "@ai-sdk/anthropic" | "@ai-sdk/groq" | "@ai-sdk/google" | "@ai-sdk/cerebras";
export declare const getProviderImportAndModelItem: (llmProvider: LLMProvider) => {
    providerImport: string;
    modelItem: string;
};
export declare function writeAgentSample(llmProvider: LLMProvider, destPath: string, addExampleTool: boolean): Promise<void>;
export declare function writeWorkflowSample(destPath: string): Promise<void>;
export declare function writeToolSample(destPath: string): Promise<void>;
export declare function writeCodeSampleForComponents(llmprovider: LLMProvider, component: Components, destPath: string, importComponents: Components[]): Promise<void | "">;
export declare const createComponentsDir: (dirPath: string, component: string) => Promise<void>;
export declare const writeIndexFile: ({ dirPath, addAgent, addExample, addWorkflow, }: {
    dirPath: string;
    addExample: boolean;
    addWorkflow: boolean;
    addAgent: boolean;
}) => Promise<void>;
export declare const checkInitialization: (dirPath: string) => Promise<boolean>;
export declare const checkAndInstallCoreDeps: (addExample: boolean) => Promise<void>;
export declare function installCoreDeps(pkg: string): Promise<void>;
export declare const getAPIKey: (provider: LLMProvider) => Promise<string>;
export declare const writeAPIKey: ({ provider, apiKey, }: {
    provider: LLMProvider;
    apiKey?: string;
}) => Promise<void>;
export declare const createMastraDir: (directory: string) => Promise<{
    ok: true;
    dirPath: string;
} | {
    ok: false;
}>;
export declare const writeCodeSample: (dirPath: string, component: Components, llmProvider: LLMProvider, importComponents: Components[]) => Promise<void>;
export declare const interactivePrompt: () => Promise<{
    directory: string;
    llmProvider: "openai" | "anthropic" | "groq" | "google" | "cerebras";
    llmApiKey: unknown;
    configureEditorWithDocsMCP: "cursor" | "cursor-global" | "windsurf" | "vscode";
}>;
export declare const checkPkgJson: () => Promise<void>;
//# sourceMappingURL=utils.d.ts.map