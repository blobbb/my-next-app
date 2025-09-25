"use client";

import { useMemo, useState } from "react";

const palettes = [
  { label: "Cyan", hue: 180 },
  { label: "Azure", hue: 210 },
  { label: "Indigo", hue: 265 },
  { label: "Magenta", hue: 320 },
  { label: "Amber", hue: 45 },
];

export default function GradientLab() {
  const [intensity, setIntensity] = useState(65);
  const [hueIndex, setHueIndex] = useState(2);
  const [saturation, setSaturation] = useState(90);
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const { gradient, stops } = useMemo(() => {
    const { hue } = palettes[hueIndex];
    const stopOne = `hsl(${hue} ${saturation}% ${intensity}%)`;
    const stopTwo = `hsl(${(hue + 40) % 360} ${Math.min(
      saturation + 5,
      100
    )}% ${Math.min(intensity + 12, 92)}%)`;
    const stopThree = `hsl(${(hue + 80) % 360} ${Math.min(
      saturation + 10,
      100
    )}% ${Math.min(intensity + 18, 96)}%)`;

    return {
      gradient: `linear-gradient(${angle}deg, ${stopOne}, ${stopTwo}, ${stopThree})`,
      stops: [
        { label: "Start", value: stopOne },
        { label: "Mid", value: stopTwo },
        { label: "End", value: stopThree },
      ],
    };
  }, [angle, hueIndex, intensity, saturation]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gradient);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("Unable to copy gradient", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-night-900/60 p-6 shadow-[0_0_35px_rgba(55,248,255,0.18)]">
        <div
          className="aspect-[5/3] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(55,248,255,0.2)]"
          style={{ backgroundImage: gradient }}
        />
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-200">
          <span className="truncate">{gradient}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:text-white"
          >
            {copied ? "Copied" : "Copy CSS"}
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {stops.map((stop) => (
            <div
              key={stop.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs uppercase tracking-[0.25em] text-slate-300"
            >
              <div className="flex items-center justify-between">
                <span>{stop.label}</span>
                <span
                  className="h-6 w-6 rounded-full border border-white/40"
                  style={{ background: stop.value }}
                />
              </div>
              <p className="mt-2 break-all font-mono text-[11px] leading-relaxed text-slate-400">
                {stop.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 rounded-3xl border border-white/5 bg-white/5 p-6 font-mono text-xs uppercase tracking-[0.3em] text-slate-300">
        <label className="grid gap-2">
          Intensity {intensity}%
          <input
            type="range"
            min={30}
            max={90}
            value={intensity}
            onChange={(event) => setIntensity(Number(event.target.value))}
            className="accent-cyan-200"
          />
        </label>
        <label className="grid gap-2">
          Saturation {saturation}%
          <input
            type="range"
            min={60}
            max={100}
            value={saturation}
            onChange={(event) => setSaturation(Number(event.target.value))}
            className="accent-pink-200"
          />
        </label>
        <label className="grid gap-2">
          Angle {angle}°
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            onChange={(event) => setAngle(Number(event.target.value))}
            className="accent-amber-200"
          />
        </label>
        <label className="grid gap-2">
          Hue Family
          <select
            value={hueIndex}
            onChange={(event) => setHueIndex(Number(event.target.value))}
            className="rounded-full border border-white/10 bg-night-800 px-4 py-2 text-[11px] uppercase tracking-[0.3em]"
          >
            {palettes.map((palette, index) => (
              <option key={palette.label} value={index}>
                {palette.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
