import { consumeStream, convertToModelMessages, streamText, UIMessage } from 'ai'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const systemMessage = {
    role: 'system' as const,
    content: `Você é um assistente de programação focado em ajudar desenvolvedores a aprender. 
    Suas respostas devem ser claras, educativas e incluir exemplos de código quando apropriado.
    Use markdown para formatar código com \`\`\`linguagem.
    Seja didático e explique conceitos de forma acessível para programadores em diferentes níveis de experiência.`,
  }

  const prompt = convertToModelMessages([
    { id: 'system', role: 'system', parts: [{ type: 'text', text: systemMessage.content }] },
    ...messages,
  ])

  const result = streamText({
    model: 'openai/gpt-5-mini',
    prompt,
    temperature: 0.7,
    maxOutputTokens: 4000,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log('[v0] Chat request aborted by user')
      }
    },
    consumeSseStream: consumeStream,
  })
}
