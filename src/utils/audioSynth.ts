// Web Audio API Synthesizer for Animal Vocalizations
// Provides rich, realistic acoustic fallback synthesizers for all 18 fauna species

export function playSynthesizedVocalization(speciesId: string): (() => void) | null {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return null;

    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    let activeNodes: (OscillatorNode | AudioBufferSourceNode)[] = [];
    const now = ctx.currentTime;

    let stopFn: () => void = () => {
      try {
        activeNodes.forEach(node => {
          try { node.stop(); } catch {}
        });
        ctx.close();
      } catch (e) {
        console.error(e);
      }
    };

    switch (speciesId) {
      case 'usr-admin-1':
      case 'sp-1': {
        // Harimau Sumatra: Deep tiger roar growl
        const osc = ctx.createOscillator();
        const subOsc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 1.2);
        osc.frequency.linearRampToValueAtTime(75, now + 2.0);
        osc.frequency.exponentialRampToValueAtTime(40, now + 2.8);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.exponentialRampToValueAtTime(180, now + 2.8);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.3);
        gain.gain.linearRampToValueAtTime(0.3, now + 1.8);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.9);

        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(65, now);
        subOsc.frequency.linearRampToValueAtTime(35, now + 2.5);
        const subGain = ctx.createGain();
        subGain.gain.setValueAtTime(0.01, now);
        subGain.gain.linearRampToValueAtTime(0.3, now + 0.4);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        subOsc.start(now);
        osc.start(now);
        subOsc.stop(now + 3.0);
        osc.stop(now + 3.0);
        activeNodes.push(subOsc, osc);
        break;
      }

      case 'sp-2': {
        // Orangutan Tapanuli: Deep Primate Long-Call (Descend Guttural Pulses)
        for (let i = 0; i < 4; i++) {
          const pulseStart = now + i * 0.65;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(160 - i * 15, pulseStart);
          osc.frequency.exponentialRampToValueAtTime(80 - i * 10, pulseStart + 0.55);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(380, pulseStart);
          filter.frequency.linearRampToValueAtTime(200, pulseStart + 0.55);

          gain.gain.setValueAtTime(0.01, pulseStart);
          gain.gain.linearRampToValueAtTime(0.35, pulseStart + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, pulseStart + 0.6);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(pulseStart);
          osc.stop(pulseStart + 0.62);
          activeNodes.push(osc);
        }
        break;
      }

      case 'sp-3': {
        // Jalak Bali: Melodious Starling Warble & Trill
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';

        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.linearRampToValueAtTime(2800, now + 0.15);
        osc.frequency.linearRampToValueAtTime(2200, now + 0.35);
        osc.frequency.linearRampToValueAtTime(3200, now + 0.55);
        osc.frequency.linearRampToValueAtTime(1900, now + 0.85);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.95);
        activeNodes.push(osc);
        break;
      }

      case 'sp-6': {
        // Anoa Pegunungan: Low Cattle Bellow Grunt
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.linearRampToValueAtTime(85, now + 1.2);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.35);
        activeNodes.push(osc);
        break;
      }

      case 'sp-7': {
        // Gajah Sumatra: Iconic Resonant Elephant Trunk Trumpet
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        lfo.frequency.setValueAtTime(7.5, now);
        lfoGain.gain.setValueAtTime(30, now);
        lfo.connect(osc1.frequency);
        lfo.connect(osc2.frequency);

        osc1.type = 'sawtooth';
        osc2.type = 'square';

        osc1.frequency.setValueAtTime(320, now);
        osc1.frequency.linearRampToValueAtTime(680, now + 0.35);
        osc1.frequency.linearRampToValueAtTime(600, now + 1.4);
        osc1.frequency.exponentialRampToValueAtTime(220, now + 2.5);

        osc2.frequency.setValueAtTime(324, now);
        osc2.frequency.linearRampToValueAtTime(684, now + 0.35);
        osc2.frequency.linearRampToValueAtTime(604, now + 1.4);
        osc2.frequency.exponentialRampToValueAtTime(224, now + 2.5);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(850, now);
        filter.frequency.linearRampToValueAtTime(1450, now + 0.4);
        filter.frequency.exponentialRampToValueAtTime(520, now + 2.4);
        filter.Q.value = 3.5;

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.5, now + 0.25);
        gain.gain.linearRampToValueAtTime(0.4, now + 1.6);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.6);

        lfo.start(now);
        osc1.start(now);
        osc2.start(now);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        lfo.stop(now + 2.7);
        osc1.stop(now + 2.7);
        osc2.stop(now + 2.7);
        activeNodes.push(lfo, osc1, osc2);
        break;
      }

      case 'sp-8': {
        // Badak Jawa: Rhinoceros Huffing Snort
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.8);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.45, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.9);
        activeNodes.push(osc);
        break;
      }

      case 'sp-9': {
        // Elang Jawa: High Piercing Eagle Screech Call
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(2200, now);
        osc.frequency.exponentialRampToValueAtTime(3800, now + 0.25);
        osc.frequency.exponentialRampToValueAtTime(1700, now + 1.1);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.25);
        activeNodes.push(osc);
        break;
      }

      case 'sp-10': {
        // Cendrawasih: Bird of Paradise Call
        for (let i = 0; i < 3; i++) {
          const chirpTime = now + i * 0.35;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(1600 + i * 200, chirpTime);
          osc.frequency.linearRampToValueAtTime(2400 + i * 150, chirpTime + 0.15);

          gain.gain.setValueAtTime(0.01, chirpTime);
          gain.gain.linearRampToValueAtTime(0.3, chirpTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, chirpTime + 0.28);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(chirpTime);
          osc.stop(chirpTime + 0.3);
          activeNodes.push(osc);
        }
        break;
      }

      case 'sp-11': {
        // Burung Maleo: Maleo Megapode Call
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.linearRampToValueAtTime(1750, now + 0.3);
        osc.frequency.linearRampToValueAtTime(1300, now + 0.7);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.8);
        activeNodes.push(osc);
        break;
      }

      case 'sp-12':
      case 'sp-38': {
        // Tarsius Wallace & Mentilin: Nocturnal High Squeak
        for (let i = 0; i < 2; i++) {
          const chirpStart = now + i * 0.25;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(4600 + i * 300, chirpStart);
          osc.frequency.linearRampToValueAtTime(5400, chirpStart + 0.1);
          osc.frequency.linearRampToValueAtTime(4200, chirpStart + 0.2);

          gain.gain.setValueAtTime(0.01, chirpStart);
          gain.gain.linearRampToValueAtTime(0.2, chirpStart + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, chirpStart + 0.22);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(chirpStart);
          osc.stop(chirpStart + 0.23);
          activeNodes.push(osc);
        }
        break;
      }

      case 'sp-22': {
        // Bekantan: Nasal Honking Klaxon Call
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(210, now);
        osc.frequency.linearRampToValueAtTime(240, now + 0.2);
        osc.frequency.linearRampToValueAtTime(180, now + 0.6);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(480, now);
        filter.Q.value = 4.0;

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
        activeNodes.push(osc);
        break;
      }

      case 'sp-24': {
        // Burung Rangkong Gading: Rhythmic Laughing Hornbill Call
        for (let i = 0; i < 5; i++) {
          const cTime = now + i * 0.22;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(320 + i * 30, cTime);
          osc.frequency.exponentialRampToValueAtTime(180 + i * 20, cTime + 0.16);

          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(750, cTime);
          filter.Q.value = 2.5;

          gain.gain.setValueAtTime(0.01, cTime);
          gain.gain.linearRampToValueAtTime(0.35, cTime + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, cTime + 0.18);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc.start(cTime);
          osc.stop(cTime + 0.2);
          activeNodes.push(osc);
        }
        break;
      }

      case 'sp-25': {
        // Kuskus Beruang: Soft Marsupial Purr
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(120, now + 0.6);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
        activeNodes.push(osc);
        break;
      }

      case 'sp-34': {
        // Kakatua Jambul Kuning: Harsh Screech
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'square';

        osc1.frequency.setValueAtTime(1400, now);
        osc1.frequency.linearRampToValueAtTime(2100, now + 0.2);
        osc1.frequency.linearRampToValueAtTime(1200, now + 0.5);

        osc2.frequency.setValueAtTime(1450, now);
        osc2.frequency.linearRampToValueAtTime(2160, now + 0.2);
        osc2.frequency.linearRampToValueAtTime(1250, now + 0.5);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.6);
        osc2.stop(now + 0.6);
        activeNodes.push(osc1, osc2);
        break;
      }

      case 'sp-35': {
        // Macan Tutul Jawa: Leopard Growl Bark
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.9);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.0);
        activeNodes.push(osc);
        break;
      }

      case 'sp-36': {
        // Pesut Mahakam: Dolphin Whistle & Click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(4200, now);
        osc.frequency.linearRampToValueAtTime(7500, now + 0.2);
        osc.frequency.linearRampToValueAtTime(5100, now + 0.45);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.55);
        activeNodes.push(osc);
        break;
      }

      case 'sp-37': {
        // Burung Merak Hijau: Peafowl Trumpet Call
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1100, now);
        osc.frequency.linearRampToValueAtTime(1400, now + 0.25);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.9);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.0);
        activeNodes.push(osc);
        break;
      }

      default: {
        // Default generic animal call
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.6);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
        activeNodes.push(osc);
        break;
      }
    }

    return stopFn;
  } catch (err) {
    console.error("Audio synth error:", err);
    return null;
  }
}
