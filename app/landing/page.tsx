import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Code2, DollarSign, Target, Zap, MessageSquare, CheckCircle2, TrendingDown, Cloud, Shield } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <header className="border-b border-border/40">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">DevCritic AI</span>
          </div>
          <Link href="/">
            <Button variant="default">Começar Agora</Button>
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="container mx-auto px-6 py-24 text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-1">
            Seu segundo cérebro crítico
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            A IA que questiona
            <br />
            <span className="text-primary">suas decisões</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Não queremos só responder. Queremos te fazer pensar melhor,
            codificar melhor e economizar melhor. Seja brutalmente honesto com seu código.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="text-base px-8">
                Testar Gratuitamente
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base px-8">
              Ver Como Funciona
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Questiona Tudo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Por que você está usando Redux? Realmente precisa desse microserviço?
                A IA não aceita decisões sem fundamento.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Code Review Brutal</h3>
              <p className="text-muted-foreground leading-relaxed">
                Revisa seu código com olhar crítico. Aponta bad smells,
                anti-patterns e te ajuda a melhorar de verdade.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exercícios Personalizados</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cria desafios específicos baseados nas suas dificuldades.
                Treina o que você realmente precisa melhorar.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tech Stack Ideal</h3>
              <p className="text-muted-foreground leading-relaxed">
                Busca e recomenda tecnologias considerando seu contexto,
                equipe, orçamento e prazo. Sem viés de hype.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Consciente de Custo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Te pergunta quanto quer gastar e adapta as respostas.
                Alto, médio ou baixo custo - sempre com opções.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contexto Completo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Entende seu projeto inteiro. Lembra das conversas passadas
                e mantém consistência nas recomendações.
              </p>
            </Card>
          </div>
        </section>

        {/* Budget Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pensa no Seu Bolso</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              A IA adapta as respostas baseado no quanto você pode investir
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-2 border-green-500/50 bg-green-500/5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-5 h-5 text-green-500" />
                <h3 className="text-xl font-semibold">Baixo Custo</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">Combine free tiers de múltiplos clouds</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">Use Vercel + Supabase + Upstash gratuitamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">SQLite local ao invés de database cloud</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">Gambiarras testadas que funcionam</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-2 border-yellow-500/50 bg-yellow-500/5">
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="w-5 h-5 text-yellow-500" />
                <h3 className="text-xl font-semibold">Médio Custo</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="text-sm">Balanceamento entre custo e performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="text-sm">PlanetScale ou Neon para databases</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="text-sm">CDN gratuita + servidor pago seletivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="text-sm">Escala progressiva conforme cresce</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-2 border-blue-500/50 bg-blue-500/5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl font-semibold">Alto Custo</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">Arquitetura enterprise com redundância</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">Multi-region, auto-scaling, monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">Soluções managed premium (AWS, GCP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">Máxima performance e confiabilidade</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Interface familiar estilo VSCode, mas com IA que desafia você
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Faz Sua Pergunta</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pergunte qualquer coisa sobre código, arquitetura ou decisões técnicas.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">A IA Questiona</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Antes de responder, te faz pensar. Por quê? Qual contexto? Quanto pode gastar?
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Resposta Contextual</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Recebe uma resposta adaptada ao seu orçamento, prazo e nível técnico.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Aprende de Verdade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A IA gera exercícios personalizados baseados nas suas dúvidas e dificuldades.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Pare de aceitar respostas prontas.
            <br />
            <span className="text-primary">Comece a pensar melhor.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            A IA que te desafia, economiza seu dinheiro e te transforma
            em um desenvolvedor mais consciente.
          </p>
          <Link href="/">
            <Button size="lg" className="text-lg px-10 py-6">
              Começar Gratuitamente
            </Button>
          </Link>
        </section>
      </main>

      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>DevCritic AI - Seu segundo cérebro crítico para programação</p>
        </div>
      </footer>
    </div>
  )
}
