
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <div className="bg-recipe-dark-green pt-28 pb-16">
        <div className="container text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Sobre nós
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Saiba mais sobre nossa missão de compartilhar receitas deliciosas
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-recipe-dark-green mb-6">
                Nossa história
              </h2>
              <p className="text-gray-700 mb-4">
                Fundada em 2023, a Degustaí surgiu da vontade de reunir, em um só lugar, receitas que antes estavam espalhadas por cadernos, anotações e lembranças. Criado por alguém que sempre gostou de cozinhar, mas vive a correria do dia a dia, o espaço nasceu para organizar e compartilhar pratos que realmente funcionam — com praticidade, sabor e um toque pessoal.
              </p>
              <p className="text-gray-700 mb-4">
                As receitas vão desde as mais rápidas até aquelas que pedem um tempo extra na cozinha. Todas foram testadas, ajustadas e escritas com dicas claras para facilitar o preparo.
              </p>
              <p className="text-gray-700">
                Hoje, a Degustaí orgulha-se de oferecer uma coleção diversificada de pratos que abrangem culturas, técnicas e níveis de habilidade — todos unidos pelo nosso compromisso com o frescor e o sabor.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=2047"
                alt="Fresh vegetables and herbs"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-recipe-tomato-red p-6 rounded-lg shadow-lg max-w-[200px]">
                <p className="font-playfair text-white italic text-lg">
                  "We believe great cooking starts with great ingredients."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl font-bold text-recipe-dark-green mb-6">
              Nossa missão
            </h2>
            <p className="text-gray-700 mb-8">
              Inspirar pessoas a cozinharem mais em casa, tornando a cozinha um lugar acessível, prático e prazeroso. Queremos mostrar que, com receitas simples e bem explicadas, qualquer um pode preparar pratos saborosos e criar momentos especiais ao redor da comida.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-recipe-light-green mx-auto">
                    <path d="M6.5 12.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M17.5 12.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M8.5 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M15.5 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M12 15.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M12 4.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M8.5 16.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M15.5 16.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M12 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M12 19.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                  </svg>
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2 text-recipe-dark-green">
                  Culinária Sustentável
                </h3>
                <p className="text-gray-600">
                  Promovendo práticas culinárias que sejam boas para as pessoas e para o planeta.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-recipe-light-green mx-auto">
                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                    <path d="M16.5 9.4 7.55 4.24"></path>
                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                    <line x1="12" x2="12" y1="22" y2="12"></line>
                    <circle cx="18.5" cy="15.5" r="2.5"></circle>
                    <path d="M20.27 17.27 22 19"></path>
                  </svg>
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2 text-recipe-dark-green">
                  Educação Culinária
                </h3>
                <p className="text-gray-600">
                  Ajudando as pessoas a desenvolver habilidades culinárias e confiança na cozinha.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-recipe-light-green mx-auto">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2 text-recipe-dark-green">
                  Construção Comunitária
                </h3>
                <p className="text-gray-600">
                  Criando conexões através do amor compartilhado pela boa comida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-recipe-dark-green mb-4">
              Conheça nosso time
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Nossa equipe diversificada de especialistas culinários e entusiastas da gastronomia traz muita experiência e paixão ao Degustaí.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Team member cards */}
            <div className="text-center">
              <div className="relative mb-6 inline-block">
                <img
                  src="/imagens/foto_laiza.jpg"
                  alt="Laiza Lima Peria"
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-1 text-recipe-dark-green">
                Laiza Lima Peria
              </h3>
              <p className="text-recipe-tomato-red mb-3">Confeiteira</p>
              <p className="text-gray-600 text-sm">
                Especialista na arte dos doces, sobremesas e massas delicadas. Seu trabalho exige atenção aos detalhes e muito amor pelo açúcar.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6 inline-block">
                <img
                  src="/imagens/foto_takes.jpg"
                  alt="Ana Beatriz Takehara"
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-1 text-recipe-dark-green">
                Ana Beatriz Takehara
              </h3>
              <p className="text-recipe-tomato-red mb-3">Crítica Gastronômica</p>
              <p className="text-gray-600 text-sm">
                Avalia pratos e experiências culinárias, analisando sabor, apresentação e qualidade com um olhar apurado.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6 inline-block">
                <img
                  src="/imagens/foto_bula.jpg"
                  alt="Heloísa Silveira Bula"
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-1 text-recipe-dark-green">
                Heloísa Silveira Bula
              </h3>
              <p className="text-recipe-tomato-red mb-3">Nutricionista</p>
              <p className="text-gray-600 text-sm">
                Garante equilíbrio e saúde nas receitas, adaptando ingredientes e orientando sobre valores nutricionais.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6 inline-block">
                <img
                  src="/imagens/foto_lara.png"
                  alt="Lara Cesquini Stopa"
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-1 text-recipe-dark-green">
                Lara Cesquini Stopa
              </h3>
              <p className="text-recipe-tomato-red mb-3">Chefe de Cozinha</p>
              <p className="text-gray-600 text-sm">
                Comanda a cozinha com técnica e liderança, criando cardápios e garantindo pratos bem executados e saborosos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
};

export default About;
