"use client";

import { useState } from "react";
import {
  Utensils,
  LayoutDashboard,
  Users,
  ShoppingCart,
  Receipt,
  Plus,
  Search,
  Menu,
  Wallet,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function cadastrarCompra(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nome.trim() || !valor || Number(valor) <= 0) {
      setMensagem("Informe um nome e um valor válido.");
      return;
    }

    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await fetch("/api/compras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome.trim(),
          valor: Number(valor),
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || "Erro ao cadastrar compra.");
      }

      setMensagem("Compra cadastrada com sucesso!");
      setNome("");
      setValor("");
    } catch (erro) {
      setMensagem(
        erro instanceof Error ? erro.message : "Erro ao cadastrar."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* MENU LATERAL */}
      <aside className="hidden md:flex w-64 bg-slate-950 text-white flex-col p-6">

        <div className="flex items-center gap-3 mb-12">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Utensils size={25} />
          </div>

          <div>
            <h1 className="font-bold text-lg">Cantina</h1>
            <p className="text-xs text-slate-400">Sistema de Gestão</p>
          </div>
        </div>

        <nav className="space-y-3">

          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-600">
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg text-slate-300">
            <Users size={19} />
            <span>Alunos</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg text-slate-300">
            <ShoppingCart size={19} />
            <span>Compras</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg text-slate-300">
            <Receipt size={19} />
            <span>Pagamentos</span>
          </div>

        </nav>

        <div className="mt-auto text-xs text-slate-500">
          Cantina Escolar © 2026
        </div>

      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 min-w-0">

        {/* CABEÇALHO */}
        <header className="bg-white border-b px-5 md:px-8 py-5 flex justify-between items-center">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Painel Administrativo
            </h2>
            <p className="text-sm text-slate-500">
              Gerencie as compras dos alunos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-slate-500">
              Administração
            </span>
            <div className="bg-blue-100 text-blue-700 rounded-full p-2">
              <Users size={20} />
            </div>
          </div>

        </header>

        {/* ÁREA DE TRABALHO */}
        <section className="p-5 md:p-8 space-y-7">

          {/* TÍTULO */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Cadastro de compras
            </h1>

            <p className="text-slate-500 mt-1">
              Registre os consumos realizados pelos alunos na cantina.
            </p>
          </div>

          {/* CARDS DE RESUMO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Compras registradas
                  </p>
                  <h3 className="text-2xl font-bold mt-2">--</h3>
                </div>

                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                  <ShoppingCart size={24} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Total consumido
                  </p>
                  <h3 className="text-2xl font-bold mt-2">R$ --</h3>
                </div>

                <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                  <Wallet size={24} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Alunos cadastrados
                  </p>
                  <h3 className="text-2xl font-bold mt-2">--</h3>
                </div>

                <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                  <Users size={24} />
                </div>
              </CardContent>
            </Card>

          </div>

          {/* FORMULÁRIO */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <Card className="lg:col-span-2">

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus size={20} className="text-blue-600" />
                  Nova compra
                </CardTitle>

                <CardDescription>
                  Preencha os dados abaixo para registrar uma compra.
                </CardDescription>
              </CardHeader>

              <CardContent>

                <form onSubmit={cadastrarCompra} className="space-y-6">

                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome do aluno</Label>

                    <Input
                      id="nome"
                      placeholder="Digite o nome completo do aluno"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor da compra</Label>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                        R$
                      </span>

                      <Input
                        id="valor"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0,00"
                        className="pl-11"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {mensagem && (
                    <p className="text-sm text-blue-700">
                      {mensagem}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={carregando}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {carregando ? "Salvando..." : "Cadastrar compra"}
                  </Button>

                </form>

              </CardContent>
            </Card>

            {/* INFORMAÇÕES */}
            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
                <CardDescription>
                  Orientações para o cadastro.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">

                <div className="flex gap-3">
                  <Users className="text-blue-600 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Identificação</p>
                    <p className="text-xs text-slate-500">
                      Informe o nome completo do aluno.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Wallet className="text-green-600 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Valor consumido</p>
                    <p className="text-xs text-slate-500">
                      Informe o valor total da compra.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Receipt className="text-purple-600 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Registro</p>
                    <p className="text-xs text-slate-500">
                      Os dados serão enviados para o servidor.
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>

          </div>

        </section>

      </main>

    </div>
  );
}
