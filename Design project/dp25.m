%Name: Joseph Boidy
%Date: 05/2/2025
%ECE 2713 Design Project - Spring 2025

%p1a
Fs = 44100;  
N = Fs * 2;  
n = 0:N-1;  
f_analog = 440;  
w_dig = 2*pi*f_analog/Fs;  
x = cos(w_dig * n);  
x = x / max(abs(x));  
sound(x, Fs, 16);  

X = fftshift(fft(x));  
Xmag = abs(X);  
XmagdB = 20*log10(Xmag);  

w = -pi:2*pi/N:pi-2*pi/N;  
f = w * Fs / (2*pi);  

figure(1); plot(f, XmagdB);  
xlim([-20000 20000]);  
title('Centered DFT Magnitude for 440 Hz Pure Tone');  
xlabel('Analog Frequency (Hz)'); ylabel('dB');  

figure(2); plot(w, XmagdB);  
xlim([-pi pi]);  
title('Centered DFT Magnitude for 440 Hz Pure Tone');  
xlabel('Radian Digital Frequency \omega'); ylabel('dB');  

figure(3); plot(w/pi, XmagdB);  
xlim([-1 1]);  
title('Centered DFT Magnitude for 440 Hz Pure Tone');  
xlabel('Normalized Digital Frequency \omega/\pi'); ylabel('dB');  

pause(3);  
audiowrite('A-440.wav', x, Fs);  
[x2, Fs] = audioread('A-440.wav');  
sound(x2, Fs, 16);  

%p1b
Fs = 44100;  
N = Fs * 2;  
n = 0:N-1;  
f_analog = 5000;  
w_dig = 2*pi*f_analog/Fs;  
x = cos(w_dig * n);  
x = x / max(abs(x));  
sound(x, Fs, 16);  

X = fftshift(fft(x));  
Xmag = abs(X);  
XmagdB = 20*log10(Xmag);  

w = -pi:2*pi/N:pi-2*pi/N;  
f = w * Fs / (2*pi);  

figure(1); plot(f, XmagdB);  
xlim([-20000 20000]);  
title('Centered DFT Magnitude for 5 kHz Pure Tone');  
xlabel('Analog Frequency (Hz)'); ylabel('dB');  

figure(2); plot(w, XmagdB);  
xlim([-pi pi]);  
title('Centered DFT Magnitude for 5 kHz Pure Tone');  
xlabel('Radian Digital Frequency \omega'); ylabel('dB');  

figure(3); plot(w/pi, XmagdB);  
xlim([-1 1]);  
title('Centered DFT Magnitude for 5 kHz Pure Tone');  
xlabel('Normalized Digital Frequency \omega/\pi'); ylabel('dB');  

pause(3);  
audiowrite('5kHz_tone.wav', x, Fs);  

%p2a
Fs = 44100;  
N = Fs * 4;  
n = 0:N-1;  

% 250 Hz tone  
f_analog = 250;  
w_dig = 2*pi*f_analog/Fs;  
x1 = cos(w_dig * n);  
sound(x1, Fs, 16); pause(5);  

% Chirp (1 kHz to 3 kHz)  
f_start_analog = 1000;  
w_start_dig = 2*pi*f_start_analog/Fs;  
f_stop_analog = 3000;  
w_stop_dig = 2*pi*f_stop_analog/Fs;  
phi = (w_stop_dig - w_start_dig)/(2*(N-1)) * (n.*n) + w_start_dig * n;  
x2 = cos(phi);  
sound(x2, Fs, 16); pause(5);  

% Combined signal  
x3 = x1 + x2;  
x3 = x3 / max(abs(x3));  
sound(x3, Fs, 16); pause(5);  

% Lowpass filter (keep 250 Hz)  
Wp = w_dig / pi;  
Ws = w_start_dig / pi;  
Rp = 1; Rs = 60;  
[Nf, Wn] = buttord(Wp, Ws, Rp, Rs);  
[num, den] = butter(Nf, Wn);  
y1 = filter(num, den, x3);  
y1 = y1 / max(abs(y1));  
sound(y1, Fs, 16); pause(5);  

% Highpass filter (keep chirp)  
Ws = w_dig / pi;  
Wp = w_start_dig / pi;  
[Nf, Wn] = buttord(Wp, Ws, Rp, Rs);  
[num2, den2] = butter(Nf, Wn, 'high');  
y2 = filter(num2, den2, x3);  
y2 = y2 / max(abs(y2));  
sound(y2, Fs, 16);  

%p2b
Fs = 44100;  
N = Fs * 4;  
n = 0:N-1;  

% 1 kHz tone  
f1_analog = 1000;  
w1_dig = 2*pi*f1_analog/Fs;  
x1 = cos(w1_dig * n);  
sound(x1, Fs, 16); pause(5);  

% 3 kHz tone  
f2_analog = 3000;  
w2_dig = 2*pi*f2_analog/Fs;  
x2 = cos(w2_dig * n);  
sound(x2, Fs, 16); pause(5);  

% Combined signal  
x3 = x1 + x2;  
x3 = x3 / max(abs(x3));  
sound(x3, Fs, 16); pause(5);  

% Lowpass filter (keep 1 kHz)  
Wp = w1_dig / pi;  
Ws = w2_dig / pi;  
Rp = 1; Rs = 60;  
[Nf, Wn] = buttord(Wp, Ws, Rp, Rs);  
[num, den] = butter(Nf, Wn);  
y1 = filter(num, den, x3);  
y1 = y1 / max(abs(y1));  
sound(y1, Fs, 16);  

%p3 Noise removal
% Load noisy signal and noise sample  
[x_noisy, Fs] = audioread('noisysig.wav');  
[noise, ~] = audioread('noisesamp.wav');  

% Play original noisy signal  
sound(x_noisy, Fs, 16); pause(5);  

% Compute DFTs  
N_noisy = length(x_noisy);  
N_noise = length(noise);  
X_noisy = fftshift(fft(x_noisy));  
X_noise = fftshift(fft(noise));  

% Plot spectra  
figure(1);  
plot((0:N_noisy-1)/N_noisy, 20*log10(abs(X_noisy)));  
title('Noisy Signal Spectrum');  

figure(2);  
plot((0:N_noise-1)/N_noise, 20*log10(abs(X_noise)));  
title('Noise Sample Spectrum');  

% Design lowpass Butterworth filter  
Wp = 0.2;  % Passband edge (normalized)  
Ws = 0.4;  % Stopband edge (normalized)  
Rp = 1;    % Passband ripple (dB)  
Rs = 60;   % Stopband attenuation (dB)  
[Nf, Wn] = buttord(Wp, Ws, Rp, Rs);  
[num, den] = butter(Nf, Wn);  

% Visualize filter response  
fvtool(num, den);  
figure(3); freqz(num, den, 1024);  

% Apply filter  
y_filtered = filter(num, den, x_noisy);  
y_filtered = y_filtered / max(abs(y_filtered));  

% Play and save filtered signal  
sound(y_filtered, Fs, 16);  
audiowrite('filteredsig.wav', y_filtered, Fs);   