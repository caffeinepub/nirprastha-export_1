import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  ExternalLink,
  Layers,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ── Scroll helpers ────────────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ── Data ─────────────────────────────────────────────────────────────────────
const SPICES = [
  {
    name: "Red Chilli",
    img: "/assets/uploads/images_9-019d1b55-8fb2-7582-b954-0e6fa7fde0f6-2.jpeg",
  },
  {
    name: "Turmeric",
    img: "/assets/uploads/51mv9jutoil._ac_uf1000_1000_ql80-019d1b3c-2511-7125-b79f-dba8e8e11fae-9.jpg",
  },
  {
    name: "Cumin Seeds",
    img: "/assets/uploads/brown-cumin-seeds-500x500-019d1b3c-24a8-713d-af6c-a84d11a12ecd-8.jpg",
  },
  {
    name: "Coriander Seeds",
    img: "/assets/generated/coriander-seeds.dim_500x500.jpg",
  },
];

const ECO_PLATES = [
  {
    name: "Bagasse Plate",
    img: "/assets/uploads/bagasse-plate-250x250-019d1b3c-14c2-73ef-ba05-00163c4f09f8-1.jpg",
    tag: "Bagasse",
  },
  {
    name: "Bagasse Disposable Plate",
    img: "/assets/uploads/bagasse-disposable-plate-500x500-019d1b3c-2189-7657-9d2b-94867a76e870-6.jpg",
    tag: "Bagasse",
  },
  {
    name: "Areca Palm — Round",
    img: "/assets/generated/areca-round-plate.dim_500x500.jpg",
    tag: "Areca",
  },
  {
    name: "Areca Palm — Heart",
    img: "/assets/generated/areca-heart-plate.dim_500x500.jpg",
    tag: "Areca",
  },
  {
    name: "Areca Palm — Square",
    img: "/assets/generated/areca-square-plate.dim_500x500.jpg",
    tag: "Areca",
  },
];

const FLY_ASH = [
  {
    name: "Fly Ash Bricks — Stacked",
    img: "/assets/uploads/slope-drain-concrete-blocks-500x500_1-019d1b3c-1dec-74ec-b939-bd19588aae86-3.jpeg",
  },
  {
    name: "Fly Ash Brick Wall",
    img: "/assets/uploads/slope-drain-concrete-blocks-500x500_2-019d1b3c-2044-7208-ae15-7418c5099c27-4.jpeg",
  },
  {
    name: "Fly Ash Bricks — Close-up",
    img: "/assets/uploads/slope-drain-concrete-blocks-500x500-019d1b3c-22af-7112-8938-cdb08570325c-7.jpeg",
  },
];

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({
  name,
  img,
  tag,
  index,
}: { name: string; img: string; tag?: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {tag && (
          <span className="absolute top-2 left-2 text-xs font-semibold bg-brand-accent text-white px-2 py-0.5 rounded-full">
            {tag}
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        <p className="font-body font-semibold text-foreground text-sm leading-snug">
          {name}
        </p>
      </div>
    </motion.div>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) {
      toast.error("Not connected. Please try again.");
      return;
    }
    setSending(true);
    try {
      await actor.submitEnquiry(name, email, phone, message);
      toast.success("Enquiry sent! We will get back to you soon.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      toast.error("Failed to send enquiry. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            data-ocid="contact.input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            data-ocid="contact.email_input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="phone">
          Phone
        </label>
        <Input
          id="phone"
          type="tel"
          data-ocid="contact.phone_input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 XXXXX XXXXX"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="message">
          Message
        </label>
        <Textarea
          id="message"
          data-ocid="contact.textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your requirements..."
          rows={4}
          required
        />
      </div>
      <Button
        type="submit"
        data-ocid="contact.submit_button"
        disabled={sending}
        className="w-full bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {sending ? "Sending..." : "Send Enquiry"}
      </Button>
      {sending && (
        <p
          data-ocid="contact.loading_state"
          className="text-sm text-muted-foreground text-center"
        >
          Submitting your enquiry...
        </p>
      )}
    </form>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Products", id: "products" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster />

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo + Company Name */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            data-ocid="nav.home_link"
            className="flex items-center gap-3 group"
            aria-label="Go to top"
          >
            <img
              src="/assets/uploads/1000391491-picsart-aiimageenhancer-019d1b3c-313c-742c-99ff-406a2d2690d5-10.jpg"
              alt="Nirprastha Export Logo"
              className="h-14 w-14 object-contain rounded-lg"
            />
            <div className="text-left">
              <p className="font-display font-bold text-foreground text-lg leading-tight">
                Nirprastha
              </p>
              <p className="font-display font-bold text-brand-accent text-lg leading-tight">
                Export
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-ocid={`nav.${link.id}_link`}
                className="text-sm font-semibold text-foreground hover:text-brand-accent transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-brand-accent hover:after:w-full after:transition-all"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("contact")}
              data-ocid="nav.cta_button"
              className="bg-brand-accent hover:bg-brand-accent-dark text-white text-sm font-semibold px-5 py-2 rounded-lg"
            >
              Get in Touch
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.menu_toggle"
            className="md:hidden p-2 rounded-md text-foreground hover:text-brand-accent"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => {
                  scrollTo(link.id);
                  setMenuOpen(false);
                }}
                className="block w-full text-left font-semibold text-foreground hover:text-brand-accent py-1"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section id="home" className="relative py-20 md:py-28 overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-accent opacity-5 translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-accent opacity-5 -translate-x-20 translate-y-20" />
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-brand-accent opacity-10 blur-2xl scale-110" />
              <img
                src="/assets/uploads/1000391491-picsart-aiimageenhancer-019d1b3c-313c-742c-99ff-406a2d2690d5-10.jpg"
                alt="Nirprastha Export Logo"
                className="relative w-48 h-48 md:w-64 md:h-64 object-contain rounded-2xl shadow-card"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4"
          >
            Nirprastha Export
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-16 h-1 bg-brand-accent mx-auto mb-6 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl font-display text-foreground/80 mb-4 max-w-2xl mx-auto"
          >
            Quality Exports from India to the World
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-base text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed"
          >
            Premium Spices · Eco-Friendly Plates · Fly Ash Bricks — sourced and
            exported with integrity from Vadodara, Gujarat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Button
              onClick={() => scrollTo("contact")}
              data-ocid="hero.cta_button"
              size="lg"
              className="bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold px-8 rounded-lg shadow-card-hover transition-all"
            >
              Get in Touch
            </Button>
            <Button
              onClick={() => scrollTo("products")}
              data-ocid="hero.products_button"
              size="lg"
              variant="outline"
              className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white font-semibold px-8 rounded-lg transition-all"
            >
              Our Products
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Category Icons Strip ────────────────────────────────── */}
      <section className="bg-brand-accent py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: <Leaf size={28} />, label: "Spices" },
              { icon: <Package size={28} />, label: "Eco-Friendly Plates" },
              { icon: <Layers size={28} />, label: "Fly Ash Bricks" },
            ].map(({ icon, label }) => (
              <button
                type="button"
                key={label}
                onClick={() => scrollTo("products")}
                className="flex flex-col items-center gap-2 text-white group"
              >
                <span className="transition-transform group-hover:scale-110">
                  {icon}
                </span>
                <span className="text-sm font-semibold tracking-wide">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ──────────────────────────────────────────────── */}
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="bg-brand-accent/10 text-brand-accent border-brand-accent/20 mb-4 text-xs uppercase tracking-widest font-semibold">
              What We Export
            </Badge>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Our Products
            </h2>
            <div className="w-12 h-1 bg-brand-accent mx-auto rounded-full" />
          </motion.div>

          <Tabs defaultValue="spices" className="w-full">
            <TabsList
              data-ocid="products.tab"
              className="flex flex-wrap justify-center gap-2 bg-transparent mb-10 h-auto"
            >
              {[
                { value: "spices", label: "🌶️ Spices" },
                { value: "eco", label: "🍃 Eco Plates" },
                { value: "bricks", label: "🧱 Fly Ash Bricks" },
              ].map(({ value, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="px-6 py-2.5 rounded-full font-semibold text-sm border border-border data-[state=active]:bg-brand-accent data-[state=active]:text-white data-[state=active]:border-brand-accent transition-all"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="spices">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {SPICES.map((p, i) => (
                  <ProductCard key={p.name} {...p} index={i} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="eco">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {ECO_PLATES.map((p, i) => (
                  <ProductCard key={p.name} {...p} index={i} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bricks">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
                {FLY_ASH.map((p, i) => (
                  <ProductCard key={p.name} {...p} index={i} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────── */}
      <section id="about" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="bg-brand-accent/10 text-brand-accent border-brand-accent/20 mb-4 text-xs uppercase tracking-widest font-semibold">
              Who We Are
            </Badge>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              About Us
            </h2>
            <div className="w-12 h-1 bg-brand-accent mx-auto rounded-full mb-6" />
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Nirprastha Export is a Vadodara-based export company committed to
              delivering premium quality products from India to global markets.
              We specialize in natural spices, sustainable eco-friendly
              tableware, and high-strength fly ash bricks — combining quality,
              reliability, and a passion for sustainable trade.
            </p>
          </motion.div>

          {/* Team */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { name: "Arpita Madaliya", role: "Founder", initials: "AM" },
              { name: "Prince Madaliya", role: "Co-Founder", initials: "PM" },
            ].map(({ name, role, initials }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-card rounded-2xl shadow-card px-8 py-8 text-center min-w-[200px] border border-border"
              >
                <div className="w-20 h-20 rounded-full bg-brand-accent flex items-center justify-center text-white text-2xl font-display font-bold mx-auto mb-4 shadow-card-hover">
                  {initials}
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  {name}
                </h3>
                <p className="text-brand-accent font-semibold text-sm mt-1">
                  {role}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Vadodara, Gujarat · India
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────── */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="bg-brand-accent/10 text-brand-accent border-brand-accent/20 mb-4 text-xs uppercase tracking-widest font-semibold">
              Reach Out
            </Badge>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h2>
            <div className="w-12 h-1 bg-brand-accent mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Left: Info + Photo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Office Photo */}
              <div className="rounded-2xl overflow-hidden shadow-card border border-border">
                <img
                  src="/assets/uploads/img20260322152650-019d1b4e-e57b-71dd-b26d-dc04cff8e293-1.jpg"
                  alt="Nirprastha Export Office - Vadodara"
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 bg-card">
                  <p className="text-xs text-brand-accent font-semibold uppercase tracking-wider mb-1">
                    Our Office
                  </p>
                  <p className="font-semibold text-foreground text-sm">
                    FF29, Akshar Residency, Waghodiya Road
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Vadodara 390019, Gujarat, India
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {[
                  {
                    label: "address",
                    icon: (
                      <MapPin
                        size={20}
                        className="text-brand-accent shrink-0 mt-0.5"
                      />
                    ),
                    content: (
                      <span>
                        FF29, Akshar Residency, Waghodiya Road, Vadodara 390019,
                        Gujarat
                      </span>
                    ),
                  },
                  {
                    label: "email",
                    icon: (
                      <Mail size={20} className="text-brand-accent shrink-0" />
                    ),
                    content: (
                      <a
                        href="mailto:nirprasthaexport@gmail.com"
                        className="hover:text-brand-accent transition-colors"
                      >
                        nirprasthaexport@gmail.com
                      </a>
                    ),
                  },
                  {
                    label: "phone",
                    icon: (
                      <Phone size={20} className="text-brand-accent shrink-0" />
                    ),
                    content: (
                      <div className="flex flex-col gap-1">
                        <a
                          href="tel:+919687380038"
                          className="hover:text-brand-accent transition-colors"
                        >
                          +91 96873 80038
                        </a>
                        <a
                          href="tel:+919624670038"
                          className="hover:text-brand-accent transition-colors"
                        >
                          +91 96246 70038
                        </a>
                      </div>
                    ),
                  },
                ].map(({ icon, content, label }) => (
                  <div
                    key={label}
                    className="flex gap-3 items-start text-sm text-foreground"
                  >
                    {icon}
                    {content}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8"
            >
              <h3 className="font-display font-bold text-xl text-foreground mb-6">
                Send an Enquiry
              </h3>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-foreground text-background py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo + Name */}
            <div className="flex items-center gap-3">
              <img
                src="/assets/uploads/1000391491-picsart-aiimageenhancer-019d1b3c-313c-742c-99ff-406a2d2690d5-10.jpg"
                alt="Nirprastha Export"
                className="h-12 w-12 object-contain rounded-lg"
              />
              <div>
                <p className="font-display font-bold text-base leading-tight">
                  Nirprastha Export
                </p>
                <p className="text-xs text-background/60 mt-0.5">
                  Vadodara, Gujarat · India
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <nav className="flex flex-wrap justify-center gap-4">
              {["Home", "Products", "About", "Contact"].map((link) => (
                <button
                  type="button"
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="text-sm text-background/70 hover:text-brand-accent transition-colors font-medium"
                >
                  {link}
                </button>
              ))}
            </nav>

            {/* Contact */}
            <div className="text-sm text-background/60 text-center md:text-right space-y-1">
              <p>nirprasthaexport@gmail.com</p>
              <p>+91 96873 80038 · +91 96246 70038</p>
            </div>
          </div>

          <div className="border-t border-background/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-background/50">
            <p>
              © {new Date().getFullYear()} Nirprastha Export. All rights
              reserved.
            </p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-accent transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
