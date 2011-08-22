
var SQUARE = "square";
var SAWTOOTH = "sawtooth";
var SINE = "sine";
var NOISE = "noise";


var masterVolume = 1.0;


function Params() {
  this.p_base_freq = 0.3;
  this.p_freq_limit = 0.0;
  this.p_freq_ramp = 0.0;
  this.p_freq_dramp = 0.0;
  this.p_duty = 0.0;
  this.p_duty_ramp = 0.0;

  this.p_vib_strength = 0.0;
  this.p_vib_speed = 0.0;
  // ? this.p_vib_delay = 0.0;

  this.p_env_attack = 0.0;
  this.p_env_sustain = 0.3;
  this.p_env_decay = 0.4;
  this.p_env_punch = 0.0;

  this.p_lpf_resonance = 0.0;
  this.p_lpf_freq = 1.0;
  this.p_lpf_ramp = 0.0;
  this.p_hpf_freq = 0.0;
  this.p_hpf_ramp = 0.0;

  this.p_pha_offset = 0.0;
  this.p_pha_ramp = 0.0;

  this.p_repeat_speed = 0.0;

  this.p_arp_speed = 0.0;
  this.p_arp_mod = 0.0;

  this.p_wave_type = SQUARE;
}


function frnd(range) {
  return Math.random() * range;
}


function rnd(max) {
  return Math.floor(Math.random() * (max + 1));
}


Params.prototype.pickupCoin = function () {
  this.p_base_freq = 0.4+frnd(0.5);
  this.p_env_attack = 0.0;
  this.p_env_sustain = frnd(0.1);
  this.p_env_decay = 0.1 + frnd(0.4);
  this.p_env_punch = 0.3 + frnd(0.3);
  if (rnd(1)) {
    this.p_arp_speed = 0.5 + frnd(0.2);
    this.p_arp_mod = 0.2 + frnd(0.4);
  }
  return this;
};

function pickupCoin() {
  return (new Params()).pickupCoin();
}

Params.prototype.laserShoot = function () {
  this.wave_type = rnd(2);
  if(this.wave_type==2 && rnd(1))
    this.wave_type = rnd(1);
  this.p_base_freq = 0.5+frnd(0.5);
  this.p_freq_limit = this.p_base_freq-0.2-frnd(0.6);
  if(this.p_freq_limit<0.2) this.p_freq_limit = 0.2;
  this.p_freq_ramp = -0.15-frnd(0.2);
  if(rnd(2)==0)
  {
    this.p_base_freq = 0.3+frnd(0.6);
    this.p_freq_limit = frnd(0.1);
    this.p_freq_ramp = -0.35-frnd(0.3);
  }
  if(rnd(1))
  {
    this.p_duty = frnd(0.5);
    this.p_duty_ramp = frnd(0.2);
  }
  else
  {
    this.p_duty = 0.4+frnd(0.5);
    this.p_duty_ramp = -frnd(0.7);
  }
  this.p_env_attack = 0.0;
  this.p_env_sustain = 0.1+frnd(0.2);
  this.p_env_decay = frnd(0.4);
  if(rnd(1))
    this.p_env_punch = frnd(0.3);
  if(rnd(2) == 0)
  {
    this.p_pha_offset = frnd(0.2);
    this.p_pha_ramp = -frnd(0.2);
  }
  if(rnd(1))
    this.p_hpf_freq = frnd(0.3);

  return this;
};

Params.prototype.explosion = function () {
  this.wave_type = 3;
  if(rnd(1))
  {
    this.p_base_freq = 0.1+frnd(0.4);
    this.p_freq_ramp = -0.1+frnd(0.4);
  }
  else
  {
    this.p_base_freq = 0.2+frnd(0.7);
    this.p_freq_ramp = -0.2-frnd(0.2);
  }
  this.p_base_freq *= this.p_base_freq;
  if(rnd(4) ==0)
    this.p_freq_ramp = 0.0;
  if(rnd(2) == 0)
    this.p_repeat_speed = 0.3+frnd(0.5);
  this.p_env_attack = 0.0;
  this.p_env_sustain = 0.1+frnd(0.3);
  this.p_env_decay = frnd(0.5);
  if(rnd(1) == 0)
  {
    this.p_pha_offset = -0.3+frnd(0.9);
    this.p_pha_ramp = -frnd(0.3);
  }
  this.p_env_punch = 0.2+frnd(0.6);
  if(rnd(1))
  {
    this.p_vib_strength = frnd(0.7);
    this.p_vib_speed = frnd(0.6);
  }
  if(rnd(2) == 0)
  {
    this.p_arp_speed = 0.6+frnd(0.3);
    this.p_arp_mod = 0.8-frnd(1.6);
  }

  return this;
}


Params.prototype.powerUp = function () {
  if(rnd(1))
    this.wave_type = 1;
  else
    this.p_duty = frnd(0.6);
  if(rnd(1))
  {
    this.p_base_freq = 0.2+frnd(0.3);
    this.p_freq_ramp = 0.1+frnd(0.4);
    this.p_repeat_speed = 0.4+frnd(0.4);
  }
  else
  {
    this.p_base_freq = 0.2+frnd(0.3);
    this.p_freq_ramp = 0.05+frnd(0.2);
    if(rnd(1))
    {
      this.p_vib_strength = frnd(0.7);
      this.p_vib_speed = frnd(0.6);
    }
  }
  this.p_env_attack = 0.0;
  this.p_env_sustain = frnd(0.4);
  this.p_env_decay = 0.1+frnd(0.4);

  return this;
}

Params.prototype.hitHurt = function () {
  this.wave_type = rnd(2);
  if(this.wave_type == 2)
    this.wave_type = 3;
  if(this.wave_type == 0)
    this.p_duty = frnd(0.6);
  this.p_base_freq = 0.2+frnd(0.6);
  this.p_freq_ramp = -0.3-frnd(0.4);
  this.p_env_attack = 0.0;
  this.p_env_sustain = frnd(0.1);
  this.p_env_decay = 0.1+frnd(0.2);
  if(rnd(1))
    this.p_hpf_freq = frnd(0.3);
  return this;
}


Params.prototype.jump = function () {
  this.wave_type = 0;
  this.p_duty = frnd(0.6);
  this.p_base_freq = 0.3+frnd(0.3);
  this.p_freq_ramp = 0.1+frnd(0.2);
  this.p_env_attack = 0.0;
  this.p_env_sustain = 0.1+frnd(0.3);
  this.p_env_decay = 0.1+frnd(0.2);
  if(rnd(1))
    this.p_hpf_freq = frnd(0.3);
  if(rnd(1))
    this.p_lpf_freq = 1.0-frnd(0.6);
  return this;
}

Params.prototype.blipSelect = function () {
  this.wave_type = rnd(1);
  if(this.wave_type == 0)
    this.p_duty = frnd(0.6);
  this.p_base_freq = 0.2+frnd(0.4);
  this.p_env_attack = 0.0;
  this.p_env_sustain = 0.1+frnd(0.1);
  this.p_env_decay = frnd(0.2);
  this.p_hpf_freq = 0.1;
  return this;
}

Params.prototype.random = function () {
  this.p_base_freq = pow(frnd(2.0)-1.0, 2.0);
  if(rnd(1))
    this.p_base_freq = pow(frnd(2.0)-1.0, 3.0)+0.5;
  this.p_freq_limit = 0.0;
  this.p_freq_ramp = pow(frnd(2.0)-1.0, 5.0);
  if(this.p_base_freq>0.7 && this.p_freq_ramp>0.2)
    this.p_freq_ramp = -this.p_freq_ramp;
  if(this.p_base_freq<0.2 && this.p_freq_ramp<-0.05)
    this.p_freq_ramp = -this.p_freq_ramp;
  this.p_freq_dramp = pow(frnd(2.0)-1.0, 3.0);
  this.p_duty = frnd(2.0)-1.0;
  this.p_duty_ramp = pow(frnd(2.0)-1.0, 3.0);
  this.p_vib_strength = pow(frnd(2.0)-1.0, 3.0);
  this.p_vib_speed = frnd(2.0)-1.0;
  this.p_env_attack = pow(frnd(2.0)-1.0, 3.0);
  this.p_env_sustain = pow(frnd(2.0)-1.0, 2.0);
  this.p_env_decay = frnd(2.0)-1.0;
  this.p_env_punch = pow(frnd(0.8), 2.0);
  if(this.p_env_attack+this.p_env_sustain+this.p_env_decay<0.2)
  {
    this.p_env_sustain += 0.2 + frnd(0.3);
    this.p_env_decay += 0.2 + frnd(0.3);
  }
  this.p_lpf_resonance = frnd(2.0)-1.0;
  this.p_lpf_freq = 1.0-pow(frnd(1.0), 3.0);
  this.p_lpf_ramp = pow(frnd(2.0)-1.0, 3.0);
  if(this.p_lpf_freq<0.1 && this.p_lpf_ramp<-0.05)
    this.p_lpf_ramp = -this.p_lpf_ramp;
  this.p_hpf_freq = pow(frnd(1.0), 5.0);
  this.p_hpf_ramp = pow(frnd(2.0)-1.0, 5.0);
  this.p_pha_offset = pow(frnd(2.0)-1.0, 3.0);
  this.p_pha_ramp = pow(frnd(2.0)-1.0, 3.0);
  this.p_repeat_speed = frnd(2.0)-1.0;
  this.p_arp_speed = frnd(2.0)-1.0;
  this.p_arp_mod = frnd(2.0)-1.0;
  return this;
}


var generate = function (ps) {
  var fperiod, period, fmaxperiod;
  var fslide, fdslide;
  var square_duty, square_slide;
  var arp_mod, arp_time, arp_limit;;

  var restart = function () {
    // restart for looping

    fperiod = 100.0 / (ps.p_base_freq * ps.p_base_freq + 0.001);
    period = Math.floor(fperiod);
    fmaxperiod = 100.0 / (ps.p_freq_limit * ps.p_freq_limit + 0.001);

    fslide = 1.0 - Math.pow(ps.p_freq_ramp, 3.0) * 0.01;
    fdslide = -Math.pow(ps.p_freq_dramp, 3.0) * 0.000001;

    square_duty = 0.5 - ps.p_duty * 0.5;
    square_slide = -ps.p_duty_ramp * 0.00005;

    if (ps.p_arp_mod >= 0.0)
      arp_mod = 1.0 - Math.pow(ps.p_arp_mod, 2.0) * 0.9;
    else
      arp_mod = 1.0 + Math.pow(ps.p_arp_mod, 2.0) * 10.0;
    arp_time = 0;
    arp_limit = Math.floor(Math.pow(1.0 - ps.p_arp_speed, 2.0) * 20000 + 32);
    if (ps.p_arp_speed == 1.0)
      arp_limit = 0;
  };

  restart();

  // Filter
  var fltp = 0.0;
  var fltdp = 0.0;
  var fltw = Math.pow(ps.p_lpf_freq, 3.0) * 0.1;
  var fltw_d = 1.0 + ps.p_lpf_ramp * 0.0001;
  var fltdmp = 5.0 / (1.0 + Math.pow(ps.p_lpf_resonance, 2.0) * 20.0) * (0.01 + fltw);
  if (fltdmp > 0.8) fltdmp=0.8;
  var fltphp = 0.0;
  var flthp = Math.pow(ps.p_hpf_freq, 2.0) * 0.1;
  var flthp_d = 1.0 + ps.p_hpf_ramp * 0.0003;

  // Vibrato
  var vib_phase = 0.0;
  var vib_speed = Math.pow(ps.p_vib_speed, 2.0) * 0.01;
  var vib_amp = ps.p_vib_strength * 0.5;

  // Envelope
  var env_vol = 0.0;
  var env_stage = 0;
  var env_time = 0;
  var env_length = [
    Math.floor(ps.p_env_attack * ps.p_env_attack * 100000.0),
    Math.floor(ps.p_env_sustain * ps.p_env_sustain * 100000.0),
    Math.floor(ps.p_env_decay * ps.p_env_decay * 100000.0)
  ];

  // Phaser
  var phase = 0;
  var fphase = Math.pow(ps.p_pha_offset, 2.0) * 1020.0;
  if (ps.p_pha_offset < 0.0) fphase = -fphase;
  var fdphase = Math.pow(ps.p_pha_ramp, 2.0) * 1.0;
  if (ps.p_pha_ramp < 0.0) fdphase = -fdphase;
  var iphase = Math.abs(Math.floor(fphase));
  var ipp = 0;
  var phaser_buffer = [];
  for (var i = 0; i < 1024; ++i)
    phaser_buffer[i] = 0.0;

  // Noise
  var noise_buffer = [];
  for (var i = 0; i < 32; ++i)
    noise_buffer[i] = Math.random() * 2.0 - 1.0;

  // Repeat
  var rep_time = 0;
  var rep_limit = Math.floor(Math.pow(1.0 - ps.p_repeat_speed, 2.0) * 20000 + 32);
  if (ps.p_repeat_speed == 0.0)
    rep_limit=0;


  // ...end of initialization


  var buffer = [];

  for(var t = 0; ; ++t) {

    // Arpeggio (single)
    if(arp_limit != 0 && t >= arp_limit) {
      arp_limit = 0;
      fperiod *= arp_mod;
    }

    // Frequency slide, and frequency slide slide!
    fslide += fdslide;
    fperiod *= fslide;
    if(fperiod > fmaxperiod) {
      fperiod = fmaxperiod;
      if (ps.p_freq_limit > 0.0)
        break;
    }

    // Vibrato
    var rfperiod = fperiod;
    if (vib_amp > 0.0) {
      vib_phase += vib_speed;
      rfperiod = fperiod * (1.0 + sin(vib_phase) * vib_amp);
    }
    period = Math.floor(rfperiod);
    if (period < 8) period = 8;

    square_duty += square_slide;
    if (square_duty < 0.0) square_duty = 0.0;
    if (square_duty > 0.5) square_duty = 0.5;

    // Volume envelope
    env_time++;
    if (env_time > env_length[env_stage]) {
      env_time = 0;
      env_stage++;
      if (env_stage == 3)
        break;
    }
    if (env_stage == 0)
      env_vol = env_time / env_length[0];
    if (env_stage == 1)
      env_vol = 1.0 + Math.pow(1.0 - env_time / env_length[1], 1.0) * 2.0 * ps.p_env_punch;
    if (env_stage == 2)
      env_vol = 1.0 - env_time / env_length[2];

    // Phaser step
    fphase += fdphase;
    iphase = Math.abs(Math.floor(fphase));
    if (iphase > 1023) iphase = 1023;

    if (flthp_d != 0.0) {
      flthp *= flthp_d;
      if (flthp < 0.00001)
        flthp = 0.00001;
      if (flthp>0.1)
        flthp = 0.1;
    }

    // 8x supersampling
    var sample = 0.0;
    for (var si = 0; si < 8; ++si) {
      var sub_sample = 0.0;
      phase++;
      if (phase >= period) {
        phase %= period;
        if (ps.wave_type == 3)
          for(var i = 0; i < 32; ++i)
            noise_buffer[i] = Math.random() * 2.0 - 1.0;
      }
      // base waveform
      var fp = phase / period;
      if (ps.wave_type == SQUARE) {
        if (fp < square_duty)
          sub_sample=0.5;
        else
          sub_sample=-0.5;
      } else if (ps.wave_type == SAWTOOTH) {
        sub_sample = 1.0 - fp * 2;
      } else if (ps.wave_type == SINE) {
        sub_sample = Math.sin(fp * 2 * Math.PI);
      } else if (ps.wave_type == NOISE) {
        sub_sample = noise_buffer[phase*32 / period];
      }

      // Low-pass filter
      var pp = fltp;
      fltw *= fltw_d;
      if (fltw < 0.0) fltw = 0.0;
      if (fltw > 0.1) fltw = 0.1;
      if (ps.p_lpf_freq != 1.0) {
        fltdp += (sub_sample - fltp) * fltw;
        fltdp -= fltdp * fltdmp;
      } else {
        fltp = sub_sample;
        fltdp = 0.0;
      }
      fltp += fltdp;

      // High-pass filter
      fltphp += fltp - pp;
      fltphp -= fltphp * flthp;
      sub_sample = fltphp;

      // Phaser
      phaser_buffer[ipp & 1023] = sub_sample;
      sub_sample += phaser_buffer[(ipp - iphase + 1024) & 1023];
      ipp = (ipp + 1) & 1023;

      // final accumulation and envelope application
      sample += sub_sample * env_vol;
    }
    sample = sample / 8 * masterVolume;

    sample *= 2.0 * ps.sound_vol;

    if (sample > 1.0) sample = 1.0;
    if (sample < -1.0) sample = -1.0;
    buffer.push(sample);

    /*
    if (file != NULL) {
      // quantize depending on format
      // accumulate/count to accomodate variable sample rate?
      sample *= 4.0;  // arbitrary gain to get reasonable output volume...
      // Clip
      if(sample > 1.0) sample = 1.0;
      if(sample < -1.0) sample = -1.0;
      filesample += sample;
      fileacc++;
      if(ps.wav_freq==44100 || fileacc==2) {
        filesample /= fileacc;
        fileacc = 0;
        if (ps.wav_bits == 16) {
          var isample = Math.floor(filesample * 32000);
          fwrite(&isample, 1, 2, file);
        }

        {
          unsigned char isample=(unsigned char)(filesample*127+128);
          fwrite(&isample, 1, 1, file);
        }
        filesample = 0.0;
      }
      ++file_sampleswritten;
    }
     */
  }

  return new RIFFWAVE(buffer);
};

if (typeof exports != 'undefined')  {
  // For node.js
  var RIFFWAVE = require("./riffwave").RIFFWAVE;
  exports.Params = Params;
  exports.generate = generate;
}