const DEV_LLM_CONFIG = {
  cwdFormatted: "/",
  model: "qwen3-max",
  ak: "sk-d658e5046bf2447686748129bddd15d7",
  ApiUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
};
const PRO_LLM_CONFIG = {
  cwdFormatted: "/",
  model: "claude_sonnet4",
  ak: "",
  ApiUrl: "",
};

export default (() => {
  if (process.env?.NODE_ENV === "local") return DEV_LLM_CONFIG;
  else return PRO_LLM_CONFIG;
})();
