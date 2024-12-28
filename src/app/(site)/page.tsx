import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="text-center mt-32">
        <p className="text-gray-600">Trusted by those companies</p>
        <div className="flex gap-8 *:h-6 mt-6 justify-center">
          <img
            src="https://images.ctfassets.net/lh3zuq09vnm2/18dCY8kGkSbfdNB2Eod1Pp/4768154e8873caa4c1574499dc4e2aab/Microsoft_Logo.svg"
            alt="microsoft"
          />
          <img
            src="https://images.ctfassets.net/lh3zuq09vnm2/1F2mq86JzeTrvpY7QdJZmh/b29471d788aabbc36a27d5dea6dae917/Nintendo.svg"
            alt="nitendo"
          />
          <img
            src="https://images.ctfassets.net/lh3zuq09vnm2/7EHGsWMc29UoHErPsvRAsi/0f8210b12ada1e9faa313b4d56274572/Panasonic.svg"
            alt="panasonic"
          />
          <img
            src="https://images.ctfassets.net/lh3zuq09vnm2/3A5yNJ7WfWikTXKsk7r4hh/4060c710bc560b59a0dd06b6521fbe94/Decathlon.svg"
            alt="decathlon"
          />
        </div>
      </section>
    </>
  );
}
