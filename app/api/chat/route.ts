import { anthropic } from '@ai-sdk/anthropic';
import { convertToModelMessages, streamText } from 'ai';

export async function POST(request: Request) {
  const { messages } = await request.json();
  const modelMessages = convertToModelMessages(messages)

  const result = streamText({
    model: anthropic("claude-3-5-haiku-latest"),
    system: `Você é um segundo cérebro de um programador, deve agir de acordo.
    Sempre questione as decisões do usuário,
    forneça alternativas de acordo com boas práticas e atualizações do mercado.
    Ajude o usuário a aprender e a evoluir. Ajude o usuário a analisar o problema e sugerir soluções,
    juntamente com o contexto do problema. Você deve responder somente perguntas sobre programação,
    não perguntas sobre outras áreas. Utilize exemplos e explicações para o usuário que deseja aprender.
    Seja direto, não concorde sempre com o usuário, analise a mensagem do usuário e forneça uma
    resposta adequada até mesmo caso necessário discordar e passar outras sugestões. Caso o usuário deseja aprender,
    formule exercícios e provas para ajudar com base na demanda do mesmo.
    Pergunte, caso o usuário tenha muitas dúvidas, se ele deseja ajuda para aprender.`,
    messages: modelMessages
  })

  return result.toUIMessageStreamResponse()
}
