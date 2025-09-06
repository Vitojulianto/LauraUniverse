import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="py-5 border-b border-white/10 text-center">
        <h1 className="text-2xl font-extrabold">Laura's Universe 🌌</h1>
        <p className="text-white/70 mt-1">
          Kinda bored, so i made this random web for you hehe.
        </p>
      </header>

      <main className="flex-1">
        <Universe />
      </main>

      <footer className="py-3 text-sm text-center text-white/60 border-t border-white/10">
        From SEEKOR VITO to SEEKOR LAURA ❤️ it's just jokes but still proud of you hahah
      </footer>
    </div>
  );
}

function Universe() {
  const funFacts = [
    { title: "Coincidence 🧋", text: "Walaupun sering berantem tapi byk kesamaan" },
    { title: "Two Sides 😂", text: "Kadang imut banget, kadang nyebelin banget" },
    { title: "Moon of Kedongoan 😴", text: "Dongonya melebihi batas normal." },
    { title: "Comet Kucing 🐱", text: "Kucing = +100 mood. Pengen melihara anjing tapi ga bisa :(" },
    { title: "Idol Guweh 🧐", text: "Jago kalau ada niat" },
    { title: "Gengsi 🤷‍♂️", text: "Suka gengsian" },
    { title: "Many else 🤣", text: "Banyak deh, pokoknya gw enjoy bgt chat sama lu" },
  ];

  const [selected, setSelected] = useState(null);

  // Planet settings (radius + color + funFacts index)
  const planetConfig = [
    { radius: 140, color: "#22d3ee", index: 0 },
    { radius: 180, color: "#f97316", index: 1 },
    { radius: 220, color: "#10b981", index: 2 },
    { radius: 260, color: "#e11d48", index: 3 },
    { radius: 300, color: "#8b5cf6", index: 4 },
    { radius: 340, color: "#14b8a6", index: 5 },
    { radius: 380, color: "#f59e0b", index: 6 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="relative h-[480px] rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/80 border border-white/6 overflow-hidden">
        {/* Soft background glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 300px at 50% 10%, rgba(99,102,241,0.12), transparent 35%)",
          }}
        />

        {/* Centerpiece: Planet Laura */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative rounded-full border-4 border-white/10 overflow-hidden shadow-2xl"
            style={{ width: 160, height: 160 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          >
            <img
              src="/Laura.jpeg"
              alt="Laura"
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/8 px-3 py-1 rounded-full text-xs">
              Planet Laura
            </div>
          </motion.div>
        </div>

        {/* Orbiting planets */}
        {planetConfig.map((planet, i) => (
          <Orbit key={i} radius={planet.radius} duration={28 + i * 10}>
            <OrbitPlanet
              color={planet.color}
              size={60}
              onClick={() => setSelected(planet.index)}
            />
          </Orbit>
        ))}
      </div>

      {/* Modal for Fun Facts */}
      <AnimatePresence>
        {selected !== null && funFacts[selected] && (
          <Modal
            onClose={() => setSelected(null)}
            title={funFacts[selected].title}
          >
            <p className="text-white/85">{funFacts[selected].text}</p>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function Orbit({ radius = 160, duration = 30, children }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: 0, height: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div style={{ transform: `translate(-50%, -50%)` }}>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${radius}px, 0)`,
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function OrbitPlanet({ size = 64, color = "#8b5cf6", onClick = () => { } }) {
  return (
    <motion.button
      onClick={onClick}
      className="rounded-full shadow-xl border-2 border-white/10 focus:outline-none"
      style={{ width: size, height: size, background: color }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      aria-label="Planet"
    />
  );
}

function Modal({ children, onClose, title }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="w-full max-w-md rounded-2xl bg-slate-800 border border-white/10 overflow-hidden shadow-2xl"
      >
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <div className="mb-4">{children}</div>
          <div className="text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-white/6 hover:bg-white/8"
            >
              Tutup
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
