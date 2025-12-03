interface PromptConfig {
  input: string;
  taskType: string;
  tone: string;
  length: string;
}

const taskPrefixes: Record<string, string> = {
  content: "You are an expert content writer. Create engaging, well-structured content that captivates readers.",
  code: "You are a senior software engineer with expertise in clean code and best practices.",
  marketing: "You are a creative marketing strategist with expertise in compelling copywriting and brand messaging.",
  research: "You are a meticulous research analyst skilled at synthesizing complex information into clear insights.",
  ideas: "You are a creative thinking expert who generates innovative, actionable ideas.",
  chat: "You are a helpful, knowledgeable assistant focused on providing clear, conversational responses.",
};

const toneModifiers: Record<string, string> = {
  Professional: "Maintain a professional, authoritative tone suitable for business contexts.",
  Casual: "Use a friendly, approachable tone that feels natural and conversational.",
  Creative: "Embrace creativity and originality, using vivid language and unique perspectives.",
  Technical: "Be precise and technical, using appropriate terminology and detailed explanations.",
};

const lengthGuidelines: Record<string, string> = {
  Concise: "Keep the response brief and to the point, focusing on essential information only.",
  Balanced: "Provide a well-balanced response with adequate detail without being excessive.",
  Detailed: "Deliver a comprehensive, in-depth response covering all relevant aspects thoroughly.",
};

export function generatePrompt(config: PromptConfig): string {
  if (!config.input.trim()) {
    return "";
  }

  const taskPrefix = taskPrefixes[config.taskType] || taskPrefixes.content;
  const toneModifier = toneModifiers[config.tone] || toneModifiers.Professional;
  const lengthGuideline = lengthGuidelines[config.length] || lengthGuidelines.Balanced;

  const prompt = `${taskPrefix}

${toneModifier} ${lengthGuideline}

## Task
${config.input}

## Guidelines
- Focus on delivering high-quality, relevant output
- Structure your response clearly with appropriate formatting
- Ensure accuracy and attention to detail
- Tailor the content to the intended audience
- Include actionable insights or practical applications where relevant

## Output Requirements
Provide a well-organized response that directly addresses the task while maintaining the specified tone and length parameters.`;

  return prompt;
}

export const templates = [
  {
    id: "blog-post",
    title: "Blog Post",
    description: "Generate engaging blog content with SEO optimization",
    icon: "FileText",
    example: "Write about sustainable living tips",
    defaultInput: "Write an engaging blog post about",
    taskType: "content",
  },
  {
    id: "code-review",
    title: "Code Review",
    description: "Get detailed code analysis and improvement suggestions",
    icon: "Code",
    example: "Review my React component for performance",
    defaultInput: "Review and improve this code:",
    taskType: "code",
  },
  {
    id: "ad-copy",
    title: "Ad Copy",
    description: "Create compelling advertising copy that converts",
    icon: "Megaphone",
    example: "Create a Facebook ad for my SaaS product",
    defaultInput: "Create compelling ad copy for",
    taskType: "marketing",
  },
  {
    id: "summary",
    title: "Research Summary",
    description: "Synthesize complex topics into clear summaries",
    icon: "Search",
    example: "Summarize recent AI developments",
    defaultInput: "Provide a comprehensive summary of",
    taskType: "research",
  },
];
