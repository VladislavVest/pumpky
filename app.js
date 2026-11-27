const introOverlay = document.getElementById('intro-overlay');
const introVideo = document.getElementById('intro-video');
const btnSkipIntro = document.getElementById('btn-skip-intro');

// --- Ключи настроек ---
const LANG_KEY = 'pumpky_lang_v1';
const SFX_KEY = 'pumpky_sfx_enabled_v1';
const FIREFLIES_KEY = 'pumpky_fireflies_count_v1';
const TRACK_KEY = 'pumpky_music_track_v1';
const SKIN_KEY = 'pumpky_pumpkin_skin_v1';
const POP_POWER_KEY = 'pumpky_pop_power_v1';
const CUSTOM_BG_KEY = 'pumpky_custom_bg_v1';

// Список треков в Sourses/sound/ — можно легко пополнять новыми объектами
const MUSIC_TRACKS = [
  {
    id: 'main-d',
    src: 'Sourses/sound/main-d.mp3',
    ru: 'Главная тема',
    en: 'Main Theme'
  },
  {
    id: 'main-witch',
    src: 'Sourses/sound/main-witch.mp3',
    ru: 'Ведьмин лес в долине мхов',
    en: 'Witch Forest in the Moss Valley'
  }
];

// 6 скинов тыкв с разным видом, остатками и брызгами при лопании
const PUMPKIN_SKINS = [
  {
    id: 'classic',
    ru: '🎃 Классическая',
    en: '🎃 Classic',
    splatPalette: ['#ff9f43', '#ff793f', '#fb923c', '#f97316', '#ffb142', '#fdba74'],
    splatAccent: '#fef08a',
    splatSpread: 52,
    splatDuration: 2.2,
    renderIntact(hueShift) {
      return `
        <svg width="64" height="58" viewBox="0 0 64 58" style="filter: hue-rotate(${hueShift}deg);" fill="none">
          <path d="M32 14 C32 8, 37 5, 41 7" stroke="#4d7c0f" stroke-width="4" stroke-linecap="round"/>
          <ellipse cx="20" cy="34" rx="13" ry="18" fill="#ea580c"/>
          <ellipse cx="44" cy="34" rx="13" ry="18" fill="#ea580c"/>
          <ellipse cx="32" cy="34" rx="12" ry="19" fill="#f97316"/>
          <path d="M27 21 C25 27, 25 38, 27 45" stroke="#fdba74" stroke-width="2" stroke-linecap="round" opacity="0.65"/>
        </svg>
      `;
    },
    renderPopped() {
      return `
        <svg width="60" height="52" viewBox="0 0 64 56" fill="none">
          <ellipse cx="32" cy="44" rx="22" ry="7" fill="#3b2618"/>
          <path d="M18 42 C22 34, 28 36, 31 43" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
          <path d="M45 41 C41 33, 35 36, 33 43" stroke="#b45309" stroke-width="3" stroke-linecap="round"/>
          <circle cx="24" cy="45" r="2" fill="#fde68a"/>
          <circle cx="38" cy="46" r="2" fill="#fde68a"/>
        </svg>
      `;
    }
  },
  {
    id: 'witch',
    ru: '🧙 Ведьминская',
    en: '🧙 Witchy',
    splatPalette: ['#9333ea', '#7e22ce', '#4ade80', '#22c55e', '#c084fc', '#a855f7'],
    splatAccent: '#bbf7d0',
    splatSpread: 60,
    splatDuration: 2.5,
    renderIntact(hueShift) {
      return `
        <svg width="66" height="60" viewBox="0 0 66 60" style="filter: hue-rotate(${hueShift}deg);" fill="none">
          <path d="M20 15 L33 4 L46 15 Z" fill="#4c1d95"/>
          <line x1="17" y1="15" x2="49" y2="15" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round"/>
          <ellipse cx="21" cy="36" rx="12.5" ry="17" fill="#581c87"/>
          <ellipse cx="45" cy="36" rx="12.5" ry="17" fill="#581c87"/>
          <ellipse cx="33" cy="36" rx="11.5" ry="18" fill="#7e22ce"/>
          <circle cx="28" cy="34" r="2.2" fill="#86efac"/>
          <circle cx="38" cy="34" r="2.2" fill="#86efac"/>
        </svg>
      `;
    },
    renderPopped() {
      return `
        <svg width="60" height="52" viewBox="0 0 64 56" fill="none">
          <ellipse cx="32" cy="45" rx="23" ry="6.5" fill="#2e1065"/>
          <path d="M17 43 L25 36 L30 44" stroke="#86efac" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M47 43 L39 37 L34 44" stroke="#c084fc" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="32" cy="45" r="2.2" fill="#4ade80"/>
        </svg>
      `;
    }
  },
  {
    id: 'ghost',
    ru: '👻 Призрачная',
    en: '👻 Spectral',
    splatPalette: ['#bae6fd', '#7dd3fc', '#a5f3fc', '#e0f2fe', '#67e8f9', '#cbd5e1'],
    splatAccent: '#ffffff',
    splatSpread: 64,
    splatDuration: 2.7,
    renderIntact(hueShift) {
      return `
        <svg width="64" height="58" viewBox="0 0 64 58" style="filter: hue-rotate(${hueShift}deg);" fill="none">
          <path d="M32 13 C32 7, 36 5, 39 7" stroke="#67e8f9" stroke-width="3.5" stroke-linecap="round"/>
          <ellipse cx="20" cy="34" rx="13" ry="17.5" fill="#38bdf8" fill-opacity="0.75"/>
          <ellipse cx="44" cy="34" rx="13" ry="17.5" fill="#38bdf8" fill-opacity="0.75"/>
          <ellipse cx="32" cy="34" rx="12" ry="18.5" fill="#bae6fd" fill-opacity="0.88"/>
          <ellipse cx="27.5" cy="33" rx="2.3" ry="3.5" fill="#0f172a"/>
          <ellipse cx="36.5" cy="33" rx="2.3" ry="3.5" fill="#0f172a"/>
        </svg>
      `;
    },
    renderPopped() {
      return `
        <svg width="60" height="52" viewBox="0 0 64 56" fill="none">
          <ellipse cx="32" cy="45" rx="22" ry="6" fill="#0f172a" fill-opacity="0.7"/>
          <path d="M19 42 Q25 35 31 43" stroke="#bae6fd" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M45 42 Q39 36 33 43" stroke="#67e8f9" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="26" cy="45" r="1.8" fill="#ffffff"/>
          <circle cx="38" cy="45" r="1.8" fill="#e0f2fe"/>
        </svg>
      `;
    }
  },
  {
    id: 'ember',
    ru: '🔥 Огненная',
    en: '🔥 Ember',
    splatPalette: ['#ef4444', '#f97316', '#fbbf24', '#dc2626', '#f59e0b', '#fb7185'],
    splatAccent: '#fef08a',
    splatSpread: 58,
    splatDuration: 2.0,
    renderIntact(hueShift) {
      return `
        <svg width="64" height="58" viewBox="0 0 64 58" style="filter: hue-rotate(${hueShift}deg);" fill="none">
          <path d="M32 14 C30 7, 36 3, 40 7 C38 10, 41 12, 39 15" fill="#fbbf24"/>
          <ellipse cx="20" cy="34" rx="13" ry="18" fill="#b91c1c"/>
          <ellipse cx="44" cy="34" rx="13" ry="18" fill="#b91c1c"/>
          <ellipse cx="32" cy="34" rx="12" ry="19" fill="#ef4444"/>
          <ellipse cx="32" cy="35" rx="6.5" ry="10" fill="#fb923c" opacity="0.65"/>
        </svg>
      `;
    },
    renderPopped() {
      return `
        <svg width="60" height="52" viewBox="0 0 64 56" fill="none">
          <ellipse cx="32" cy="45" rx="23" ry="6.5" fill="#450a0a"/>
          <path d="M18 43 L24 35 L30 43" stroke="#fbbf24" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M46 43 L40 36 L34 43" stroke="#f97316" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="32" cy="44" r="2.2" fill="#fef08a"/>
        </svg>
      `;
    }
  },
  {
    id: 'moss',
    ru: '🌿 Мшистая',
    en: '🌿 Mossy',
    splatPalette: ['#65a30d', '#84cc16', '#4d7c0f', '#a3e635', '#d97706', '#a16207'],
    splatAccent: '#ecfccb',
    splatSpread: 50,
    splatDuration: 2.4,
    renderIntact(hueShift) {
      return `
        <svg width="64" height="58" viewBox="0 0 64 58" style="filter: hue-rotate(${hueShift}deg);" fill="none">
          <path d="M32 14 C32 8, 37 5, 41 7" stroke="#84cc16" stroke-width="4" stroke-linecap="round"/>
          <ellipse cx="20" cy="34" rx="13" ry="18" fill="#3f6212"/>
          <ellipse cx="44" cy="34" rx="13" ry="18" fill="#3f6212"/>
          <ellipse cx="32" cy="34" rx="12" ry="19" fill="#65a30d"/>
          <path d="M21 23 C25 20, 31 21, 35 24" stroke="#a3e635" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
        </svg>
      `;
    },
    renderPopped() {
      return `
        <svg width="60" height="52" viewBox="0 0 64 56" fill="none">
          <ellipse cx="32" cy="45" rx="22" ry="6.5" fill="#1a2e05"/>
          <path d="M18 42 C22 35, 28 37, 31 43" stroke="#84cc16" stroke-width="3" stroke-linecap="round"/>
          <path d="M45 42 C41 35, 35 37, 33 43" stroke="#a3e635" stroke-width="3" stroke-linecap="round"/>
          <circle cx="25" cy="45" r="2" fill="#ecfccb"/>
          <circle cx="38" cy="45" r="2" fill="#d97706"/>
        </svg>
      `;
    }
  },
  {
    id: 'jack',
    ru: '😈 Хеллоуинская',
    en: '😈 Jack-o\'-Lantern',
    splatPalette: ['#ff793f', '#f97316', '#facc15', '#ea580c', '#fde047', '#fb923c'],
    splatAccent: '#fef9c3',
    splatSpread: 56,
    splatDuration: 2.3,
    renderIntact(hueShift) {
      return `
        <svg width="64" height="58" viewBox="0 0 64 58" style="filter: hue-rotate(${hueShift}deg);" fill="none">
          <path d="M32 14 C32 8, 37 5, 41 7" stroke="#4d7c0f" stroke-width="4" stroke-linecap="round"/>
          <ellipse cx="20" cy="34" rx="13" ry="18" fill="#ea580c"/>
          <ellipse cx="44" cy="34" rx="13" ry="18" fill="#ea580c"/>
          <ellipse cx="32" cy="34" rx="12" ry="19" fill="#f97316"/>
          <polygon points="26,27 22,33 29,33" fill="#fef08a"/>
          <polygon points="38,27 35,33 42,33" fill="#fef08a"/>
          <polygon points="32,33 29.5,37 34.5,37" fill="#fde047"/>
          <path d="M21 40 L26 44 L30 40 L32 45 L34 40 L38 44 L43 40 L39 47 L25 47 Z" fill="#fef08a"/>
        </svg>
      `;
    },
    renderPopped() {
      return `
        <svg width="60" height="52" viewBox="0 0 64 56" fill="none">
          <ellipse cx="32" cy="44" rx="22" ry="7" fill="#3b2618"/>
          <polygon points="24,41 21,45 27,45" fill="#fef08a" opacity="0.8"/>
          <polygon points="40,41 37,45 43,45" fill="#fef08a" opacity="0.8"/>
          <path d="M18 42 C22 34, 28 36, 31 43" stroke="#ea580c" stroke-width="3" stroke-linecap="round"/>
          <path d="M45 41 C41 33, 35 36, 33 43" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
        </svg>
      `;
    }
  }
];

const I18N = {
  ru: {
    tabSession: 'Сессия',
    tabSettings: 'Настройки',
    langBtn: '🌐 RU',
    sfxOn: '🔊 ВКЛ',
    sfxOff: '🔇 ВЫКЛ',
    skipIntro: 'Пропустить →',
    subtitle: 'Выставь количество задач на сессию. Каждая тыква — один закрытый шаг.',
    countLabel: 'Количество тыкв (от 3 до 36):',
    startSession: 'Посадить тыквы',
    continueSaved: 'Продолжить сохранённое',
    settingsHeading: 'Настройки',
    settingLang: 'Язык интерфейса',
    settingSfx: 'Звуки эффектов и кликов',
    settingMusic: 'Фоновая музыка',
    settingTrack: 'Трек',
    settingSkin: 'Скин тыкв',
    settingPopPower: 'Сила лопанья тыкв',
    settingFireflies: 'Светлячки в лесу (2–10)',
    settingBg: 'Режим просмотра фона (H)',
    settingCustomBg: 'Свой фон',
    chooseBgBtn: '🖼 Выбрать',
    resetBgBtn: '↺ Сброс',
    settingResetDefaults: 'Сброс настроек',
    resetDefaultsBtn: '↺ По умолчанию',
    settingAbout: 'Информация',
    openAboutBtn: '📜 О программе',
    aboutBack: '← Вернуться',
    aboutDesc: 'Программа построена на технике «помидоро»: работаешь короткими фокусированными подходами без отвлечений, а затем делаешь паузу, чтобы держать темп и не выгореть.',
    settingExit: 'Завершение работы',
    backToPumpkins: '🎃 К тыквам',
    doneLabel: '🎃 Выполнено:',
    autosaveOn: 'Автосохранение включено',
    savedFlash: 'Сохранено ✓',
    startPrefix: 'Старт:',
    minutesUnit: 'мин',
    musicOn: '🎵 ВКЛ',
    musicOff: '🔇 ВЫКЛ',
    zenBg: '🌲 Фон',
    zenCards: '🎃 Карточки',
    addPumpkin: '+ Тыква',
    undo: '↩ Вернуть',
    save: '💾 Сохранить',
    alarmBtn: '⏱ Таймер',
    topSoundOn: 'Звук',
    topSoundOff: 'Тихо',
    restart: '🔄 Рестарт',
    menu: '⚙ Меню',
    exit: '⏻ Выход',
    alarmTitle: 'Таймер',
    alarmSub: 'Выставь часы и минуты — по окончании прозвучит сигнал.',
    alarmHours: 'Часы',
    alarmMinutes: 'Минуты',
    alarmStart: '▶ Запустить',
    alarmStop: '⏹ Сбросить',
    alarmClose: 'Закрыть',
    restartTitle: 'Сбросить сессию?',
    restartCancel: 'Отмена',
    restartConfirm: 'Да, рестарт',
    confirmRestart: 'Текущая сессия будет полностью сброшена, и вы вернётесь к выбору количества тыкв.',
    exitTitle: 'Вы уверены?',
    exitText: 'Прогресс будет сохранён, а работа программы завершится.',
    exitCancel: 'Отмена',
    exitConfirm: 'Да, выйти',
    summaryTitle: 'Сессия завершена!',
    summarySub: 'Все тыквы лопнуты — вот итог твоего фокуса.',
    summaryTotalTime: 'Общее время',
    summaryDone: 'Закрыто тыкв',
    summaryAvg: 'Среднее на задачу',
    summaryFinishedAt: 'Завершено в',
    summaryLongest: 'Самая долгая задача',
    summaryStay: 'К поляне',
    summaryNew: 'Новая сессия',
    taskDefault: (n) => `Задача #${n}`,
    taskPlaceholder: (n) => `Задача #${n}`,
    enterTextHint: 'Введите текст',
    inProgress: 'В работе',
    poppedAt: (t) => `Лопнута: ${t}`,
    popTitle: 'Нажми, чтобы лопнуть тыкву (выполнить)',
    replantTitle: 'Нажми, чтобы посадить тыкву заново',
    timerTitle: 'Нажми для запуска или паузы таймера'
  },
  en: {
    tabSession: 'Session',
    tabSettings: 'Settings',
    langBtn: '🌐 EN',
    sfxOn: '🔊 ON',
    sfxOff: '🔇 OFF',
    skipIntro: 'Skip →',
    subtitle: 'Set how many tasks to plant for this session. Each pumpkin is one completed step.',
    countLabel: 'Number of pumpkins (3 to 36):',
    startSession: 'Plant pumpkins',
    continueSaved: 'Continue saved',
    settingsHeading: 'Settings',
    settingLang: 'Interface language',
    settingSfx: 'SFX & click sounds',
    settingMusic: 'Background music',
    settingTrack: 'Track',
    settingSkin: 'Pumpkin skin',
    settingPopPower: 'Pumpkin pop power',
    settingFireflies: 'Forest fireflies (2–10)',
    settingBg: 'Forest view mode (H)',
    settingCustomBg: 'Custom background',
    chooseBgBtn: '🖼 Choose',
    resetBgBtn: '↺ Reset',
    settingResetDefaults: 'Reset settings',
    resetDefaultsBtn: '↺ Default',
    settingAbout: 'Info',
    openAboutBtn: '📜 About',
    aboutBack: '← Back',
    aboutDesc: 'Built around the Pomodoro technique: work in short focused sprints without distractions, then take a break to stay sharp without burning out.',
    settingExit: 'Exit application',
    backToPumpkins: '🎃 To pumpkins',
    doneLabel: '🎃 Done:',
    autosaveOn: 'Autosave enabled',
    savedFlash: 'Saved ✓',
    startPrefix: 'Started:',
    minutesUnit: 'min',
    musicOn: '🎵 ON',
    musicOff: '🔇 OFF',
    zenBg: '🌲 Forest',
    zenCards: '🎃 Cards',
    addPumpkin: '+ Pumpkin',
    undo: '↩ Undo',
    save: '💾 Save',
    alarmBtn: '⏱ Timer',
    topSoundOn: 'Sound',
    topSoundOff: 'Muted',
    restart: '🔄 Restart',
    menu: '⚙ Menu',
    exit: '⏻ Exit',
    alarmTitle: 'Timer',
    alarmSub: 'Set hours and minutes — an alarm will play when finished.',
    alarmHours: 'Hours',
    alarmMinutes: 'Minutes',
    alarmStart: '▶ Start',
    alarmStop: '⏹ Reset',
    alarmClose: 'Close',
    restartTitle: 'Reset session?',
    restartCancel: 'Cancel',
    restartConfirm: 'Yes, restart',
    confirmRestart: 'This will reset the entire session and return to the pumpkin count menu.',
    exitTitle: 'Are you sure?',
    exitText: 'Your progress will be saved and the app will close.',
    exitCancel: 'Cancel',
    exitConfirm: 'Yes, exit',
    summaryTitle: 'Session complete!',
    summarySub: 'All pumpkins popped — here is your focus summary.',
    summaryTotalTime: 'Total time',
    summaryDone: 'Pumpkins done',
    summaryAvg: 'Avg per task',
    summaryFinishedAt: 'Finished at',
    summaryLongest: 'Longest task',
    summaryStay: 'To garden',
    summaryNew: 'New session',
    taskDefault: (n) => `Task #${n}`,
    taskPlaceholder: (n) => `Task #${n}`,
    enterTextHint: 'Enter text',
    inProgress: 'Active',
    poppedAt: (t) => `Popped: ${t}`,
    popTitle: 'Click to pop pumpkin (complete)',
    replantTitle: 'Click to plant a fresh pumpkin',
    timerTitle: 'Click to start or pause timer'
  }
};

function createCrowSVG(muted) {
  if (muted) {
    return `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M18 6 L6 18" stroke="#f87171" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M6 6 L18 18" stroke="#f87171" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M15 9 C17 9, 19 10, 21 11 L18 13 C17 16, 13 18, 9 18 C6 18, 4 16, 4 14 C4 11, 7 8, 11 7 Z" fill="#94a3b8" opacity="0.65"/>
      </svg>
    `;
  }
  return `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M15 7 C17.5 7, 19.5 8.5, 22 10 L18.5 12.2 C17.5 16, 13.5 18.5, 9 18.5 C5.8 18.5, 3.5 16.5, 3.5 14 C3.5 10.5, 7 7, 12 6.5 Z" fill="#1e293b" stroke="#ffb142" stroke-width="1.4"/>
      <circle cx="15.5" cy="9.5" r="1.4" fill="#ffb142"/>
      <path d="M8 13 C10.5 11.5, 13 12, 14 14.5" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;
}

function clampFireflies(val) {
  const num = parseInt(val, 10);
  if (isNaN(num)) return 3;
  return Math.min(10, Math.max(2, num));
}

function clampPopPower(val) {
  const num = parseInt(val, 10);
  if (isNaN(num)) return 1;
  return Math.min(10, Math.max(1, num));
}

function getValidTrackId(savedId) {
  if (MUSIC_TRACKS.some(tr => tr.id === savedId)) return savedId;
  return MUSIC_TRACKS[0].id;
}

function getTrackById(id) {
  return MUSIC_TRACKS.find(tr => tr.id === id) || MUSIC_TRACKS[0];
}

function getTrackLabel(track) {
  return currentLang === 'en' ? track.en : track.ru;
}

function getValidSkinId(savedId) {
  if (PUMPKIN_SKINS.some(sk => sk.id === savedId)) return savedId;
  return PUMPKIN_SKINS[0].id;
}

function getSkinById(id) {
  return PUMPKIN_SKINS.find(sk => sk.id === id) || PUMPKIN_SKINS[0];
}

function getSkinLabel(skin) {
  return currentLang === 'en' ? skin.en : skin.ru;
}

let currentLang = localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'ru';
let sfxEnabled = localStorage.getItem(SFX_KEY) !== 'false';
let firefliesCount = clampFireflies(localStorage.getItem(FIREFLIES_KEY) || '3');
let currentTrackId = getValidTrackId(localStorage.getItem(TRACK_KEY));
let currentSkinId = getValidSkinId(localStorage.getItem(SKIN_KEY));
let popPower = clampPopPower(localStorage.getItem(POP_POWER_KEY) || '1');
let customBgDataUrl = localStorage.getItem(CUSTOM_BG_KEY) || '';
let saveFlashTimer = null;

function t(key, ...args) {
  const dict = I18N[currentLang] || I18N.ru;
  const val = dict[key];
  return typeof val === 'function' ? val(...args) : val;
}

// --- Кастомная всплывающая подсказка при наведении на поле ввода текста ---
const hoverHintEl = document.createElement('div');
hoverHintEl.className = 'task-hover-hint';
document.body.appendChild(hoverHintEl);

function showTextInputHint(targetEl) {
  if (!targetEl) return;
  const rect = targetEl.getBoundingClientRect();
  hoverHintEl.textContent = t('enterTextHint');
  hoverHintEl.style.left = `${Math.round(rect.left + rect.width / 2)}px`;
  hoverHintEl.style.top = `${Math.max(8, Math.round(rect.top - 6))}px`;
  hoverHintEl.classList.add('visible');
}

function moveTextInputHint(targetEl) {
  if (!hoverHintEl.classList.contains('visible') || !targetEl) return;
  const rect = targetEl.getBoundingClientRect();
  hoverHintEl.style.left = `${Math.round(rect.left + rect.width / 2)}px`;
  hoverHintEl.style.top = `${Math.max(8, Math.round(rect.top - 6))}px`;
}

function hideTextInputHint() {
  hoverHintEl.classList.remove('visible');
}

// --- Лёгкий синтезируемый клик кнопок (Web Audio API, без внешних файлов) ---
let clickAudioCtx = null;

function playButtonClick() {
  if (!sfxEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!clickAudioCtx) {
      clickAudioCtx = new AudioCtx();
    }
    if (clickAudioCtx.state === 'suspended') {
      clickAudioCtx.resume().catch(() => { });
    }

    const now = clickAudioCtx.currentTime;
    const osc = clickAudioCtx.createOscillator();
    const gain = clickAudioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(190, now + 0.028);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.032);

    osc.connect(gain);
    gain.connect(clickAudioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  } catch (_) { }
}

// Звук вырастания новой тыквы
const growUpSound = new Audio('Sourses/sound/gr-up.wav');
growUpSound.volume = 0.65;

// Звук завершения таймера (рядом с фоновыми треками)
const alarmSound = new Audio('Sourses/sound/alarm.mp3');
alarmSound.volume = 0.85;

function playAlarmSound() {
  try {
    alarmSound.currentTime = 0;
    const p = alarmSound.play();
    if (p && typeof p.catch === 'function') p.catch(() => { });
  } catch (_) { }
}

let lastGrownPumpkinId = null;
let lastPoppedPumpkinId = null;
let editingTaskId = null;
let cardsHiddenForBg = false;

function playGrowUpSound() {
  if (!sfxEnabled) return;
  try {
    growUpSound.currentTime = 0;
    const playPromise = growUpSound.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => { });
    }
  } catch (err) {
    // игнорируем ошибку воспроизведения
  }
}

// --- Звуковой движок ---
class SoundEngine {
  constructor() {
    this.musicEnabled = true;

    const initialTrack = getTrackById(currentTrackId);
    this.bgmAudio = new Audio(initialTrack.src);
    this.bgmAudio.loop = true;

    const savedVol = parseFloat(localStorage.getItem('pumpky_music_volume'));
    this.bgmAudio.volume = Number.isFinite(savedVol) ? Math.min(1, Math.max(0, savedVol)) : 0.35;

    this.introAudio = new Audio('Sourses/sound/intro.wav');
    this.introAudio.volume = 0.7;

    this.popPaths = [
      'Sourses/sound/tomato/1.mp3',
      'Sourses/sound/tomato/2.mp3',
      'Sourses/sound/tomato/3.mp3',
      'Sourses/sound/tomato/4.mp3',
      'Sourses/sound/tomato/5.mp3',
      'Sourses/sound/tomato/6.mp3',
      'Sourses/sound/tomato/7.mp3'
    ];
    this.lastPopIndex = -1;
  }

  init() { }

  setTrack(trackId) {
    const track = getTrackById(trackId);
    currentTrackId = track.id;
    localStorage.setItem(TRACK_KEY, currentTrackId);

    const wasPlaying = !this.bgmAudio.paused;
    this.bgmAudio.pause();
    this.bgmAudio.src = track.src;
    this.bgmAudio.currentTime = 0;
    this.bgmAudio.load();

    if (this.musicEnabled && wasPlaying) {
      this.startAmbient();
    }
  }

  setMusicVolume(volume01) {
    const clamped = Math.min(1, Math.max(0, volume01));
    this.bgmAudio.volume = clamped;
    localStorage.setItem('pumpky_music_volume', String(clamped));
  }

  playIntroSound() {
    if (!sfxEnabled) return;
    try {
      this.introAudio.currentTime = 0;
      const p = this.introAudio.play();
      if (p && typeof p.catch === 'function') p.catch(() => { });
    } catch (_) { }
  }

  stopIntroSound() {
    try {
      this.introAudio.pause();
      this.introAudio.currentTime = 0;
    } catch (_) { }
  }

  playWelcomeChord() {
    if (this.musicEnabled) {
      this.startAmbient();
    }
  }

  playPopSound() {
    if (!sfxEnabled || this.popPaths.length === 0) return;

    let idx = Math.floor(Math.random() * this.popPaths.length);
    if (this.popPaths.length > 1 && idx === this.lastPopIndex) {
      idx = (idx + 1) % this.popPaths.length;
    }
    this.lastPopIndex = idx;

    try {
      const popAudio = new Audio(this.popPaths[idx]);
      popAudio.volume = 0.8;
      const p = popAudio.play();
      if (p && typeof p.catch === 'function') p.catch(() => { });
    } catch (_) { }
  }

  startAmbient() {
    if (!this.musicEnabled) return;
    try {
      if (this.bgmAudio.paused) {
        const p = this.bgmAudio.play();
        if (p && typeof p.catch === 'function') p.catch(() => { });
      }
    } catch (_) { }
  }

  stopAmbient() {
    try {
      this.bgmAudio.pause();
    } catch (_) { }
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
    return this.musicEnabled;
  }
}

const sound = new SoundEngine();

// --- Генерация светлячков (2..10) с цветовым циклом и лёгкой индивидуальностью ---
const firefliesLayerEl = document.getElementById('fireflies-layer');

function renderFireflies() {
  if (!firefliesLayerEl) return;
  firefliesLayerEl.innerHTML = '';

  const driftAnims = ['fireflyDriftA', 'fireflyDriftB', 'fireflyDriftC', 'fireflyDriftD'];
  const sizes = [5, 6, 7, 6.5, 5.5, 7.5, 6, 5.5, 7, 6];

  for (let i = 0; i < firefliesCount; i++) {
    const el = document.createElement('div');
    el.className = 'firefly';

    const sizePx = sizes[i % sizes.length] + ((i * 7) % 5) * 0.25;
    const driftAnim = driftAnims[i % driftAnims.length];
    const driftDur = (21 + ((i * 5) % 13)).toFixed(1) + 's';
    const driftDelay = (-((i * 3.7) % 18)).toFixed(1) + 's';
    const glowDur = (32 + ((i * 7) % 15)).toFixed(1) + 's';
    const glowDelay = (-((i * 5.3) % 24)).toFixed(1) + 's';

    el.style.setProperty('--ff-size', `${sizePx.toFixed(1)}px`);
    el.style.setProperty('--ff-drift-anim', driftAnim);
    el.style.setProperty('--ff-drift-dur', driftDur);
    el.style.setProperty('--ff-drift-delay', driftDelay);
    el.style.setProperty('--ff-glow-dur', glowDur);
    el.style.setProperty('--ff-glow-delay', glowDelay);

    firefliesLayerEl.appendChild(el);
  }
}

// --- Состояние приложения ---
const STORAGE_KEY = 'pump_tracker_state_v1';
const appLaunchTimeStr = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

let state = {
  pumpkins: [],
  popHistory: []
};

let tickerInterval = null;
let lastTickerNow = 0;
let showingSavedFlash = false;

// --- Состояние таймера обратного отсчёта (часы + минуты) ---
let alarmRemainingSec = 0;
let alarmRunning = false;
let alarmInterval = null;
let alarmEndTime = 0;

// --- Элементы DOM ---
const sceneBgEl = document.getElementById('scene-bg');
const startOverlay = document.getElementById('start-overlay');
const workspace = document.getElementById('workspace');
const countInput = document.getElementById('pumpkin-count');
const countSlider = document.getElementById('pumpkin-slider');
const btnMinus = document.getElementById('btn-minus');
const btnPlus = document.getElementById('btn-plus');
const btnStartSession = document.getElementById('btn-start-session');
const btnContinueSaved = document.getElementById('btn-continue-saved');

const tabSession = document.getElementById('tab-session');
const tabSettings = document.getElementById('tab-settings');
const panelSession = document.getElementById('panel-session');
const panelSettings = document.getElementById('panel-settings');

const settingsHeadingEl = document.getElementById('settings-heading');
const settingLangLabelEl = document.getElementById('setting-lang-label');
const settingSfxLabelEl = document.getElementById('setting-sfx-label');
const settingMusicLabelEl = document.getElementById('setting-music-label');
const settingTrackLabelEl = document.getElementById('setting-track-label');
const settingSkinLabelEl = document.getElementById('setting-skin-label');
const settingPopPowerLabelEl = document.getElementById('setting-pop-power-label');
const settingFirefliesLabelEl = document.getElementById('setting-fireflies-label');
const settingBgLabelEl = document.getElementById('setting-bg-label');
const settingCustomBgLabelEl = document.getElementById('setting-custom-bg-label');
const settingResetDefaultsLabelEl = document.getElementById('setting-reset-defaults-label');
const settingAboutLabelEl = document.getElementById('setting-about-label');
const settingExitLabelEl = document.getElementById('setting-exit-label');

const btnLang = document.getElementById('btn-lang');
const btnSfx = document.getElementById('btn-sfx');
const btnMenuMusicToggle = document.getElementById('btn-menu-music-toggle');
const menuMusicSlider = document.getElementById('menu-music-slider');
const menuMusicValue = document.getElementById('menu-music-value');
const musicTrackSelect = document.getElementById('music-track-select');
const pumpkinSkinSelect = document.getElementById('pumpkin-skin-select');
const popPowerSlider = document.getElementById('pop-power-slider');
const popPowerValue = document.getElementById('pop-power-value');
const btnFirefliesMinus = document.getElementById('btn-fireflies-minus');
const btnFirefliesPlus = document.getElementById('btn-fireflies-plus');
const firefliesCountValEl = document.getElementById('fireflies-count-val');
const btnMenuZen = document.getElementById('btn-menu-zen');
const btnChooseBg = document.getElementById('btn-choose-bg');
const btnResetBg = document.getElementById('btn-reset-bg');
const customBgInput = document.getElementById('custom-bg-input');
const btnResetDefaults = document.getElementById('btn-reset-defaults');
const btnOpenAbout = document.getElementById('btn-open-about');
const btnMenuExit = document.getElementById('btn-menu-exit');
const btnSettingsToPumpkins = document.getElementById('btn-settings-to-pumpkins');

const menuSubtitleEl = document.getElementById('menu-subtitle');
const menuCountLabelEl = document.getElementById('menu-count-label');

const gardenGrid = document.getElementById('garden-grid');
const labelDoneEl = document.getElementById('label-done');
const doneCountEl = document.getElementById('done-count');
const totalCountEl = document.getElementById('total-count');
const saveStatusEl = document.getElementById('save-status');
const appStartTimeEl = document.getElementById('app-start-time');
const fireTotalMinutesEl = document.getElementById('fire-total-minutes');

const btnAddPumpkin = document.getElementById('btn-add-pumpkin');
const btnUndo = document.getElementById('btn-undo');
const btnSave = document.getElementById('btn-save');
const btnAlarmTimer = document.getElementById('btn-alarm-timer');
const btnTopSound = document.getElementById('btn-top-sound');
const crowIconSlot = document.getElementById('crow-icon-slot');
const btnTopSoundText = document.getElementById('btn-top-sound-text');
const btnRestart = document.getElementById('btn-restart');
const btnMenu = document.getElementById('btn-menu');
const btnExit = document.getElementById('btn-exit');

// Модальное окно «О программе»
const aboutModal = document.getElementById('about-modal');
const aboutModalText = document.getElementById('about-modal-text');
const btnAboutBack = document.getElementById('btn-about-back');

// Модальное окно таймера
const alarmModal = document.getElementById('alarm-modal');
const alarmModalTitle = document.getElementById('alarm-modal-title');
const alarmModalSub = document.getElementById('alarm-modal-sub');
const alarmCountdownDisplay = document.getElementById('alarm-countdown-display');
const alarmHoursLabel = document.getElementById('alarm-hours-label');
const alarmMinutesLabel = document.getElementById('alarm-minutes-label');
const alarmHoursInput = document.getElementById('alarm-hours-input');
const alarmMinutesInput = document.getElementById('alarm-minutes-input');
const btnAlarmStart = document.getElementById('btn-alarm-start');
const btnAlarmStop = document.getElementById('btn-alarm-stop');
const btnAlarmClose = document.getElementById('btn-alarm-close');

// Модальное окно подтверждения рестарта
const restartModal = document.getElementById('restart-modal');
const restartModalTitle = document.getElementById('restart-modal-title');
const restartModalText = document.getElementById('restart-modal-text');
const btnRestartCancel = document.getElementById('btn-restart-cancel');
const btnRestartConfirm = document.getElementById('btn-restart-confirm');

// Модальное окно подтверждения выхода
const exitModal = document.getElementById('exit-modal');
const exitModalTitle = document.getElementById('exit-modal-title');
const exitModalText = document.getElementById('exit-modal-text');
const btnExitCancel = document.getElementById('btn-exit-cancel');
const btnExitConfirm = document.getElementById('btn-exit-confirm');

// Модальное окно статистики завершённой сессии
const summaryModal = document.getElementById('summary-modal');
const summaryModalTitle = document.getElementById('summary-modal-title');
const summaryModalSub = document.getElementById('summary-modal-sub');
const summaryLabelTotalTime = document.getElementById('summary-label-total-time');
const summaryLabelDone = document.getElementById('summary-label-done');
const summaryLabelAvg = document.getElementById('summary-label-avg');
const summaryLabelFinishedAt = document.getElementById('summary-label-finished-at');
const summaryLabelLongest = document.getElementById('summary-label-longest');
const summaryTotalTimeEl = document.getElementById('summary-total-time');
const summaryDoneCountEl = document.getElementById('summary-done-count');
const summaryAvgTimeEl = document.getElementById('summary-avg-time');
const summaryFinishedAtEl = document.getElementById('summary-finished-at');
const summaryLongestTaskEl = document.getElementById('summary-longest-task');
const btnSummaryStay = document.getElementById('btn-summary-stay');
const btnSummaryNew = document.getElementById('btn-summary-new');

let summaryShownForSession = false;

function formatHMS(totalSec) {
  const safe = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(safe / 3600).toString().padStart(2, '0');
  const m = Math.floor((safe % 3600) / 60).toString().padStart(2, '0');
  const s = (safe % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function formatMinSec(sec) {
  const safe = Math.max(0, Math.round(sec));
  const m = Math.floor(safe / 60).toString().padStart(2, '0');
  const s = (safe % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function renderSessionSummary() {
  const totalCount = state.pumpkins.length;
  const doneCount = state.pumpkins.filter(p => p.popped).length;
  const totalSec = state.pumpkins.reduce((sum, p) => sum + (Number(p.seconds) || 0), 0);
  const avgSec = totalCount > 0 ? totalSec / totalCount : 0;

  let longestPumpkin = null;
  state.pumpkins.forEach((p, idx) => {
    const sec = Number(p.seconds) || 0;
    if (!longestPumpkin || sec > (Number(longestPumpkin.seconds) || 0)) {
      longestPumpkin = { ...p, _index: idx };
    }
  });

  const lastPoppedId = state.popHistory[state.popHistory.length - 1];
  const lastPoppedPumpkin = state.pumpkins.find(p => p.id === lastPoppedId);
  const finishedAt = (lastPoppedPumpkin && lastPoppedPumpkin.completedAt) || getCurrentClockTime();

  if (summaryTotalTimeEl) summaryTotalTimeEl.textContent = formatHMS(totalSec);
  if (summaryDoneCountEl) summaryDoneCountEl.textContent = `${doneCount} / ${totalCount}`;
  if (summaryAvgTimeEl) summaryAvgTimeEl.textContent = formatMinSec(avgSec);
  if (summaryFinishedAtEl) summaryFinishedAtEl.textContent = finishedAt;

  if (summaryLongestTaskEl) {
    if (!longestPumpkin || (Number(longestPumpkin.seconds) || 0) <= 0) {
      summaryLongestTaskEl.textContent = '—';
    } else {
      const label = longestPumpkin.title && longestPumpkin.title.trim()
        ? longestPumpkin.title.trim()
        : t('taskDefault', longestPumpkin._index + 1);
      summaryLongestTaskEl.textContent = `${label} (${formatMinSec(longestPumpkin.seconds)})`;
    }
  }
}

function openSummaryModal() {
  if (!summaryModal) return;
  renderSessionSummary();
  summaryModal.classList.remove('hidden');
}

function closeSummaryModal() {
  if (!summaryModal) return;
  summaryModal.classList.add('hidden');
}

function checkAndShowSessionSummary() {
  if (summaryShownForSession) return;
  const totalCount = state.pumpkins.length;
  if (totalCount === 0) return;
  const allPopped = state.pumpkins.every(p => p.popped);
  if (allPopped) {
    summaryShownForSession = true;
    openSummaryModal();
  }
}

function getInputAlarmSeconds() {
  const h = Math.min(23, Math.max(0, parseInt(alarmHoursInput && alarmHoursInput.value, 10) || 0));
  const m = Math.min(59, Math.max(0, parseInt(alarmMinutesInput && alarmMinutesInput.value, 10) || 0));
  if (alarmHoursInput) alarmHoursInput.value = String(h);
  if (alarmMinutesInput) alarmMinutesInput.value = String(m);
  return h * 3600 + m * 60;
}

function syncAlarmUI() {
  const displaySec = alarmRunning || alarmRemainingSec > 0 ? alarmRemainingSec : getInputAlarmSeconds();
  if (alarmCountdownDisplay) {
    alarmCountdownDisplay.textContent = formatHMS(displaySec);
  }
  if (btnAlarmTimer) {
    btnAlarmTimer.classList.toggle('is-active', alarmRunning);
    if (alarmRunning) {
      const mm = Math.floor(alarmRemainingSec / 60).toString().padStart(2, '0');
      const ss = (alarmRemainingSec % 60).toString().padStart(2, '0');
      const hh = Math.floor(alarmRemainingSec / 3600);
      btnAlarmTimer.textContent = hh > 0 ? `⏱ ${hh}:${mm}:${ss}` : `⏱ ${mm}:${ss}`;
    } else {
      btnAlarmTimer.textContent = t('alarmBtn');
    }
  }
  if (btnAlarmStop) {
    btnAlarmStop.classList.toggle('hidden', !alarmRunning && alarmRemainingSec === 0);
  }
}

function refreshAlarmCountdown() {
  if (!alarmRunning) return;
  const leftSec = Math.max(0, Math.ceil((alarmEndTime - Date.now()) / 1000));
  alarmRemainingSec = leftSec;
  if (leftSec <= 0) {
    stopAlarmCountdown();
    playAlarmSound();
  } else {
    syncAlarmUI();
  }
}

function stopAlarmCountdown() {
  alarmRunning = false;
  alarmRemainingSec = 0;
  alarmEndTime = 0;
  if (alarmInterval) {
    clearInterval(alarmInterval);
    alarmInterval = null;
  }
  syncAlarmUI();
}

function startAlarmCountdown() {
  const sec = getInputAlarmSeconds();
  if (sec <= 0) return;

  if (alarmInterval) {
    clearInterval(alarmInterval);
    alarmInterval = null;
  }

  alarmRemainingSec = sec;
  alarmEndTime = Date.now() + sec * 1000;
  alarmRunning = true;
  syncAlarmUI();

  alarmInterval = setInterval(refreshAlarmCountdown, 500);
}

function openAlarmModal() {
  if (!alarmModal) return;
  syncAlarmUI();
  alarmModal.classList.remove('hidden');
}

function closeAlarmModal() {
  if (!alarmModal) return;
  alarmModal.classList.add('hidden');
}

function openRestartModal() {
  if (!restartModal) return;
  restartModal.classList.remove('hidden');
}

function closeRestartModal() {
  if (!restartModal) return;
  restartModal.classList.add('hidden');
}

function openExitModal() {
  if (!exitModal) return;
  exitModal.classList.remove('hidden');
}

function closeExitModal() {
  if (!exitModal) return;
  exitModal.classList.add('hidden');
}

function resetAllSettingsToDefault() {
  currentLang = 'ru';
  sfxEnabled = true;
  firefliesCount = 3;
  currentTrackId = MUSIC_TRACKS[0].id;
  currentSkinId = PUMPKIN_SKINS[0].id;
  popPower = 1;
  customBgDataUrl = '';
  cardsHiddenForBg = false;
  if (workspace) workspace.classList.remove('cards-hidden');

  localStorage.removeItem(LANG_KEY);
  localStorage.removeItem(SFX_KEY);
  localStorage.removeItem(FIREFLIES_KEY);
  localStorage.removeItem(TRACK_KEY);
  localStorage.removeItem(SKIN_KEY);
  localStorage.removeItem(POP_POWER_KEY);
  localStorage.removeItem(CUSTOM_BG_KEY);
  localStorage.removeItem('pumpky_music_volume');

  sound.musicEnabled = true;
  sound.setMusicVolume(0.35);
  sound.setTrack(currentTrackId);
  sound.startAmbient();

  applyCustomBackground();
  renderFireflies();
  applyLanguageUI();
}

function applyCustomBackground() {
  if (!sceneBgEl) return;
  if (customBgDataUrl) {
    sceneBgEl.style.backgroundImage = `linear-gradient(180deg, rgba(8, 11, 19, 0.18) 0%, rgba(8, 11, 19, 0.38) 100%), url("${customBgDataUrl}")`;
  } else {
    sceneBgEl.style.backgroundImage = '';
  }
  if (btnResetBg) {
    btnResetBg.classList.toggle('hidden', !customBgDataUrl);
  }
}

function syncTopSoundButton() {
  const isSoundActive = sfxEnabled || sound.musicEnabled;
  if (btnTopSound) {
    btnTopSound.classList.toggle('is-muted', !isSoundActive);
  }
  if (crowIconSlot) {
    crowIconSlot.innerHTML = createCrowSVG(!isSoundActive);
  }
  if (btnTopSoundText) {
    btnTopSoundText.textContent = isSoundActive ? t('topSoundOn') : t('topSoundOff');
  }
}

function setAllSoundEnabled(enabled) {
  sfxEnabled = enabled;
  sound.musicEnabled = enabled;
  localStorage.setItem(SFX_KEY, String(sfxEnabled));
  if (enabled) {
    sound.startAmbient();
    playButtonClick();
  } else {
    sound.stopAmbient();
    sound.stopIntroSound();
  }
  applyLanguageUI();
}

function syncSettingsBackButton() {
  if (!btnSettingsToPumpkins) return;
  const hasSession = Array.isArray(state.pumpkins) && state.pumpkins.length >= 3;
  btnSettingsToPumpkins.classList.toggle('hidden', !hasSession);
}

function renderTrackOptions() {
  if (!musicTrackSelect) return;
  musicTrackSelect.innerHTML = '';
  MUSIC_TRACKS.forEach(tr => {
    const opt = document.createElement('option');
    opt.value = tr.id;
    opt.textContent = getTrackLabel(tr);
    if (tr.id === currentTrackId) opt.selected = true;
    musicTrackSelect.appendChild(opt);
  });
}

function renderSkinOptions() {
  if (!pumpkinSkinSelect) return;
  pumpkinSkinSelect.innerHTML = '';
  PUMPKIN_SKINS.forEach(sk => {
    const opt = document.createElement('option');
    opt.value = sk.id;
    opt.textContent = getSkinLabel(sk);
    if (sk.id === currentSkinId) opt.selected = true;
    pumpkinSkinSelect.appendChild(opt);
  });
}

function setMenuTab(tabName) {
  const isSettings = tabName === 'settings';
  if (tabSession) tabSession.classList.toggle('active', !isSettings);
  if (tabSettings) tabSettings.classList.toggle('active', isSettings);
  if (panelSession) panelSession.classList.toggle('hidden', isSettings);
  if (panelSettings) panelSettings.classList.toggle('hidden', !isSettings);
  syncSettingsBackButton();
}

function formatDuration(sec) {
  const mins = Math.floor(sec / 60).toString().padStart(2, '0');
  const secs = (sec % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function getCurrentClockTime() {
  const now = new Date();
  return now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function clampCount(val) {
  const num = parseInt(val, 10);
  if (isNaN(num)) return 12;
  return Math.min(36, Math.max(3, num));
}

function getTotalWorkedMinutes() {
  const totalSec = state.pumpkins.reduce((sum, p) => sum + (Number(p.seconds) || 0), 0);
  return Math.floor(totalSec / 60);
}

function updateTopStatsMeta() {
  if (appStartTimeEl) {
    appStartTimeEl.textContent = `${t('startPrefix')} ${appLaunchTimeStr}`;
  }
  if (fireTotalMinutesEl) {
    fireTotalMinutesEl.textContent = `🔥 ${getTotalWorkedMinutes()} ${t('minutesUnit')}`;
  }
  if (saveStatusEl) {
    saveStatusEl.textContent = showingSavedFlash ? t('savedFlash') : t('autosaveOn');
  }
}

function syncSettingsControlsUI() {
  const pct = Math.round(sound.bgmAudio.volume * 100);
  if (menuMusicSlider) menuMusicSlider.value = pct;
  if (menuMusicValue) menuMusicValue.textContent = `${pct}%`;
  if (btnMenuMusicToggle) {
    btnMenuMusicToggle.textContent = sound.musicEnabled ? t('musicOn') : t('musicOff');
    btnMenuMusicToggle.classList.toggle('is-off', !sound.musicEnabled);
  }
  renderTrackOptions();
  renderSkinOptions();

  if (popPowerSlider) popPowerSlider.value = String(popPower);
  if (popPowerValue) popPowerValue.textContent = `${popPower}x`;

  if (firefliesCountValEl) {
    firefliesCountValEl.textContent = String(firefliesCount);
  }
  if (btnFirefliesMinus) btnFirefliesMinus.disabled = firefliesCount <= 2;
  if (btnFirefliesPlus) btnFirefliesPlus.disabled = firefliesCount >= 10;

  if (btnMenuZen) {
    btnMenuZen.textContent = cardsHiddenForBg ? t('zenCards') : t('zenBg');
    btnMenuZen.classList.toggle('active-mode', cardsHiddenForBg);
  }

  if (btnResetBg) {
    btnResetBg.classList.toggle('hidden', !customBgDataUrl);
  }

  syncSettingsBackButton();
  syncTopSoundButton();
  syncAlarmUI();
}

function applyLanguageUI() {
  document.documentElement.lang = currentLang;
  if (tabSession) tabSession.textContent = t('tabSession');
  if (tabSettings) tabSettings.textContent = t('tabSettings');
  if (btnLang) btnLang.textContent = t('langBtn');
  if (btnSfx) {
    btnSfx.textContent = sfxEnabled ? t('sfxOn') : t('sfxOff');
    btnSfx.classList.toggle('is-off', !sfxEnabled);
  }
  if (btnSkipIntro) btnSkipIntro.textContent = t('skipIntro');
  if (menuSubtitleEl) menuSubtitleEl.textContent = t('subtitle');
  if (menuCountLabelEl) menuCountLabelEl.textContent = t('countLabel');
  if (btnStartSession) btnStartSession.textContent = t('startSession');
  if (btnContinueSaved) btnContinueSaved.textContent = t('continueSaved');
  if (settingsHeadingEl) settingsHeadingEl.textContent = t('settingsHeading');
  if (settingLangLabelEl) settingLangLabelEl.textContent = t('settingLang');
  if (settingSfxLabelEl) settingSfxLabelEl.textContent = t('settingSfx');
  if (settingMusicLabelEl) settingMusicLabelEl.textContent = t('settingMusic');
  if (settingTrackLabelEl) settingTrackLabelEl.textContent = t('settingTrack');
  if (settingSkinLabelEl) settingSkinLabelEl.textContent = t('settingSkin');
  if (settingPopPowerLabelEl) settingPopPowerLabelEl.textContent = t('settingPopPower');
  if (settingFirefliesLabelEl) settingFirefliesLabelEl.textContent = t('settingFireflies');
  if (settingBgLabelEl) settingBgLabelEl.textContent = t('settingBg');
  if (settingCustomBgLabelEl) settingCustomBgLabelEl.textContent = t('settingCustomBg');
  if (btnChooseBg) btnChooseBg.textContent = t('chooseBgBtn');
  if (btnResetBg) btnResetBg.textContent = t('resetBgBtn');
  if (settingResetDefaultsLabelEl) settingResetDefaultsLabelEl.textContent = t('settingResetDefaults');
  if (btnResetDefaults) btnResetDefaults.textContent = t('resetDefaultsBtn');
  if (settingAboutLabelEl) settingAboutLabelEl.textContent = t('settingAbout');
  if (btnOpenAbout) btnOpenAbout.textContent = t('openAboutBtn');
  if (aboutModalText) aboutModalText.textContent = t('aboutDesc');
  if (btnAboutBack) btnAboutBack.textContent = t('aboutBack');
  if (settingExitLabelEl) settingExitLabelEl.textContent = t('settingExit');
  if (btnMenuExit) btnMenuExit.textContent = t('exit');
  if (btnSettingsToPumpkins) btnSettingsToPumpkins.textContent = t('backToPumpkins');

  if (labelDoneEl) labelDoneEl.textContent = t('doneLabel');
  if (btnAddPumpkin) btnAddPumpkin.textContent = t('addPumpkin');
  if (btnUndo) btnUndo.textContent = t('undo');
  if (btnSave) btnSave.textContent = t('save');
  if (btnRestart) btnRestart.textContent = t('restart');
  if (btnMenu) btnMenu.textContent = t('menu');
  if (btnExit) btnExit.textContent = t('exit');

  if (alarmModalTitle) alarmModalTitle.textContent = t('alarmTitle');
  if (alarmModalSub) alarmModalSub.textContent = t('alarmSub');
  if (alarmHoursLabel) alarmHoursLabel.textContent = t('alarmHours');
  if (alarmMinutesLabel) alarmMinutesLabel.textContent = t('alarmMinutes');
  if (btnAlarmStart) btnAlarmStart.textContent = t('alarmStart');
  if (btnAlarmStop) btnAlarmStop.textContent = t('alarmStop');
  if (btnAlarmClose) btnAlarmClose.textContent = t('alarmClose');

  if (restartModalTitle) restartModalTitle.textContent = t('restartTitle');
  if (restartModalText) restartModalText.textContent = t('confirmRestart');
  if (btnRestartCancel) btnRestartCancel.textContent = t('restartCancel');
  if (btnRestartConfirm) btnRestartConfirm.textContent = t('restartConfirm');

  if (exitModalTitle) exitModalTitle.textContent = t('exitTitle');
  if (exitModalText) exitModalText.textContent = t('exitText');
  if (btnExitCancel) btnExitCancel.textContent = t('exitCancel');
  if (btnExitConfirm) btnExitConfirm.textContent = t('exitConfirm');

  if (summaryModalTitle) summaryModalTitle.textContent = t('summaryTitle');
  if (summaryModalSub) summaryModalSub.textContent = t('summarySub');
  if (summaryLabelTotalTime) summaryLabelTotalTime.textContent = t('summaryTotalTime');
  if (summaryLabelDone) summaryLabelDone.textContent = t('summaryDone');
  if (summaryLabelAvg) summaryLabelAvg.textContent = t('summaryAvg');
  if (summaryLabelFinishedAt) summaryLabelFinishedAt.textContent = t('summaryFinishedAt');
  if (summaryLabelLongest) summaryLabelLongest.textContent = t('summaryLongest');
  if (btnSummaryStay) btnSummaryStay.textContent = t('summaryStay');
  if (btnSummaryNew) btnSummaryNew.textContent = t('summaryNew');

  updateTopStatsMeta();
  syncSettingsControlsUI();
  if (workspace && !workspace.classList.contains('hidden')) {
    renderGarden();
  }
  if (summaryModal && !summaryModal.classList.contains('hidden')) {
    renderSessionSummary();
  }
}

function makeFreshPumpkin(id) {
  return {
    id,
    title: '',
    seconds: 0,
    running: false,
    popped: false,
    completedAt: null,
    hueShift: Math.floor(Math.random() * 14) - 7,
    scale: (0.94 + Math.random() * 0.14).toFixed(2)
  };
}

function saveState(showFlash = false) {
  const toSave = {
    pumpkins: state.pumpkins.map(p => ({ ...p, running: false, lastTickAt: null })),
    popHistory: state.popHistory
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));

  if (showFlash) {
    showingSavedFlash = true;
    updateTopStatsMeta();
    if (saveFlashTimer) clearTimeout(saveFlashTimer);
    saveFlashTimer = setTimeout(() => {
      showingSavedFlash = false;
      updateTopStatsMeta();
    }, 1500);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.pumpkins) && parsed.pumpkins.length >= 3) {
      parsed.pumpkins = parsed.pumpkins.map(p => ({
        ...p,
        title: typeof p.title === 'string' ? p.title : ''
      }));
      return parsed;
    }
  } catch (e) {
    console.error('Ошибка чтения сохранения:', e);
  }
  return null;
}

function spawnPumpkinSplatOnElement(hostEl, skin) {
  if (!hostEl) return;

  const activeSkin = skin || getSkinById(currentSkinId);
  const burst = document.createElement('div');
  burst.className = 'splat-burst';

  const palette = activeSkin.splatPalette;
  const piecesCount = Math.round(13 + (popPower - 1) * 5);
  const powerBoost = 1 + (popPower - 1) * 0.34;
  const baseSpread = (activeSkin.splatSpread || 52) * powerBoost;
  const baseDur = (activeSkin.splatDuration || 2.2) + (popPower - 1) * 0.08;

  for (let i = 0; i < piecesCount; i++) {
    const piece = document.createElement('span');
    piece.className = 'splat-piece';

    const angle = (Math.PI * 2 * i) / piecesCount + (Math.random() * 0.55 - 0.275);
    const dist = baseSpread * 0.58 + Math.random() * baseSpread * 0.95;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - (6 + (popPower - 1) * 2.2);
    const rawSize = i % 7 === 0 ? 8 : Math.round(8 + Math.random() * 11);
    const sz = Math.min(34, Math.round(rawSize * (1 + (popPower - 1) * 0.14)));
    const sc = ((0.9 + Math.random() * 0.7) * (1 + (popPower - 1) * 0.12)).toFixed(2);
    const rot = `${Math.floor(Math.random() * 360 - 180)}deg`;
    const dur = `${(baseDur + (Math.random() * 0.6 - 0.3)).toFixed(2)}s`;
    const col = i % 7 === 0 ? activeSkin.splatAccent : palette[i % palette.length];

    piece.style.setProperty('--tx', `${tx.toFixed(1)}px`);
    piece.style.setProperty('--ty', `${ty.toFixed(1)}px`);
    piece.style.setProperty('--sz', `${sz}px`);
    piece.style.setProperty('--sc', sc);
    piece.style.setProperty('--rot', rot);
    piece.style.setProperty('--dur', dur);
    piece.style.setProperty('--col', col);

    burst.appendChild(piece);
  }

  hostEl.appendChild(burst);

  setTimeout(() => {
    burst.remove();
  }, 3600);
}

function createPumpkinSVG(hueShift, popped) {
  const skin = getSkinById(currentSkinId);
  if (popped) {
    return skin.renderPopped(hueShift);
  }
  return skin.renderIntact(hueShift);
}

function commitTaskTitle(id, rawValue) {
  const target = state.pumpkins.find(p => p.id === id);
  if (target) {
    target.title = rawValue.trim().slice(0, 48);
    saveState();
  }
  editingTaskId = null;
  hideTextInputHint();
  renderGarden();
}

function renderGarden() {
  gardenGrid.innerHTML = '';
  const activeSkin = getSkinById(currentSkinId);

  let done = 0;
  state.pumpkins.forEach((p, index) => {
    if (p.popped) done++;

    const card = document.createElement('div');
    card.className = 'pumpkin-card';
    if (p.running) card.classList.add('running');
    if (p.popped) card.classList.add('popped');

    const wobbleDur = (3 + (index % 5) * 0.35).toFixed(2) + 's';
    const wobbleDelay = ((index % 7) * -0.4).toFixed(2) + 's';

    const visual = document.createElement('div');
    visual.className = 'pumpkin-visual';
    if (p.id === lastGrownPumpkinId) {
      visual.classList.add('pumpkin-growing');
    }
    visual.style.setProperty('--wobble-dur', wobbleDur);
    visual.style.setProperty('--wobble-delay', wobbleDelay);
    visual.style.transform = `scale(${p.scale})`;
    visual.title = p.popped ? t('replantTitle') : t('popTitle');
    visual.innerHTML = createPumpkinSVG(p.hueShift, p.popped);

    if (p.id === lastPoppedPumpkinId) {
      spawnPumpkinSplatOnElement(visual, activeSkin);
    }

    visual.addEventListener('click', () => {
      playButtonClick();
      togglePopPumpkin(p.id);
    });

    const timerPill = document.createElement('div');
    timerPill.className = 'timer-pill';
    timerPill.title = t('timerTitle');
    timerPill.textContent = p.running ? `⏸ ${formatDuration(p.seconds)}` : `▶ ${formatDuration(p.seconds)}`;
    timerPill.addEventListener('click', () => {
      playButtonClick();
      toggleTimer(p.id);
    });

    const titleWrap = document.createElement('div');
    titleWrap.className = 'task-field-wrap';

    if (editingTaskId === p.id) {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'task-title-input';
      input.value = p.title || '';
      input.placeholder = t('enterTextHint');
      input.maxLength = 48;

      input.addEventListener('mouseenter', () => showTextInputHint(input));
      input.addEventListener('mousemove', () => moveTextInputHint(input));
      input.addEventListener('mouseleave', hideTextInputHint);

      let finished = false;
      const finishEdit = (save) => {
        if (finished) return;
        finished = true;
        hideTextInputHint();
        if (save) {
          commitTaskTitle(p.id, input.value);
        } else {
          editingTaskId = null;
          renderGarden();
        }
      };

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          finishEdit(true);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          finishEdit(false);
        }
      });

      input.addEventListener('blur', () => finishEdit(true));

      titleWrap.appendChild(input);
      setTimeout(() => {
        input.focus();
        input.select();
      }, 0);
    } else {
      const box = document.createElement('div');
      const hasCustomTitle = Boolean(p.title && p.title.trim());
      box.className = 'task-title-box' + (hasCustomTitle ? '' : ' is-placeholder');
      box.textContent = hasCustomTitle ? p.title : t('taskPlaceholder', index + 1);

      box.addEventListener('mouseenter', () => showTextInputHint(box));
      box.addEventListener('mousemove', () => moveTextInputHint(box));
      box.addEventListener('mouseleave', hideTextInputHint);

      box.addEventListener('click', (e) => {
        e.stopPropagation();
        playButtonClick();
        hideTextInputHint();
        editingTaskId = p.id;
        renderGarden();
      });
      titleWrap.appendChild(box);
    }

    const doneBox = document.createElement('div');
    doneBox.className = 'done-time-box';
    doneBox.textContent = p.popped ? t('poppedAt', p.completedAt) : t('inProgress');

    card.appendChild(visual);
    card.appendChild(timerPill);
    card.appendChild(titleWrap);
    card.appendChild(doneBox);
    gardenGrid.appendChild(card);
  });

  doneCountEl.textContent = done;
  totalCountEl.textContent = state.pumpkins.length;
  btnUndo.disabled = state.popHistory.length === 0;
  if (btnAddPumpkin) {
    btnAddPumpkin.disabled = state.pumpkins.length >= 36;
  }

  updateTopStatsMeta();
  lastGrownPumpkinId = null;
  lastPoppedPumpkinId = null;
}

function createSession(count) {
  const safeCount = clampCount(count);
  state.pumpkins = Array.from({ length: safeCount }, (_, i) => makeFreshPumpkin(i + 1));
  state.popHistory = [];
  summaryShownForSession = false;
  editingTaskId = null;
  saveState();
  openWorkspace();
}

function openWorkspace() {
  startOverlay.classList.remove('visible');
  setTimeout(() => {
    startOverlay.classList.add('hidden');
    workspace.classList.remove('hidden');
    requestAnimationFrame(() => workspace.classList.add('visible'));
  }, 450);

  renderGarden();
  startGlobalTicker();
}

function openMenu(initialTab = 'session') {
  editingTaskId = null;
  hideTextInputHint();
  setMenuTab(initialTab);
  syncSettingsControlsUI();

  workspace.classList.remove('visible');
  setTimeout(() => {
    workspace.classList.add('hidden');
    startOverlay.classList.remove('hidden');
    requestAnimationFrame(() => startOverlay.classList.add('visible'));
  }, 350);
}

function toggleBackgroundView() {
  if (!workspace || workspace.classList.contains('hidden')) return;
  cardsHiddenForBg = !cardsHiddenForBg;
  workspace.classList.toggle('cards-hidden', cardsHiddenForBg);
  syncSettingsControlsUI();
}

function exitApplication() {
  state.pumpkins.forEach(p => (p.running = false));
  saveState();
  sound.stopAmbient();
  sound.stopIntroSound();
  if (window.pumpkyAPI && typeof window.pumpkyAPI.quitApp === 'function') {
    window.pumpkyAPI.quitApp();
  } else {
    window.close();
  }
}

function toggleTimer(id) {
  sound.init();
  const target = state.pumpkins.find(p => p.id === id);
  if (!target || target.popped) return;

  const now = Date.now();
  if (target.running && target.lastTickAt) {
    target.seconds += Math.max(0, Math.floor((now - target.lastTickAt) / 1000));
  }

  target.running = !target.running;
  target.lastTickAt = target.running ? now : null;

  renderGarden();
  saveState();
}

function togglePopPumpkin(id) {
  const target = state.pumpkins.find(p => p.id === id);
  if (!target) return;

  if (!target.popped) {
    target.popped = true;
    target.running = false;
    target.completedAt = getCurrentClockTime();
    state.popHistory.push(id);
    lastPoppedPumpkinId = id;
    sound.playPopSound();
  } else {
    target.popped = false;
    target.running = false;
    target.seconds = 0;
    target.completedAt = null;
    state.popHistory = state.popHistory.filter(item => item !== id);
    summaryShownForSession = false;
    lastGrownPumpkinId = id;
    playGrowUpSound();
  }

  renderGarden();
  saveState();
  checkAndShowSessionSummary();
}

function addFreshPumpkin() {
  if (state.pumpkins.length >= 36) return;
  const maxId = state.pumpkins.reduce((acc, p) => Math.max(acc, p.id), 0);
  const newPumpkin = makeFreshPumpkin(maxId + 1);
  state.pumpkins.push(newPumpkin);
  summaryShownForSession = false;
  lastGrownPumpkinId = newPumpkin.id;
  playGrowUpSound();
  renderGarden();
  saveState();
}

function undoLastPop() {
  if (state.popHistory.length === 0) return;
  const lastId = state.popHistory.pop();
  const target = state.pumpkins.find(p => p.id === lastId);
  if (target) {
    target.popped = false;
    target.running = false;
    target.completedAt = null;
    summaryShownForSession = false;
    lastGrownPumpkinId = lastId;
    playGrowUpSound();
  }
  renderGarden();
  saveState();
}

function startGlobalTicker() {
  if (tickerInterval) clearInterval(tickerInterval);
  lastTickerNow = Date.now();

  tickerInterval = setInterval(() => {
    const now = Date.now();
    const elapsedSec = Math.max(0, Math.floor((now - lastTickerNow) / 1000));
    if (elapsedSec <= 0) return;
    lastTickerNow = now;

    if (editingTaskId !== null) return;

    let changed = false;
    state.pumpkins.forEach(p => {
      if (p.running && !p.popped) {
        p.seconds += elapsedSec;
        p.lastTickAt = now;
        changed = true;
      }
    });
    if (changed) {
      renderGarden();
      if (state.pumpkins.some(p => p.running && p.seconds % 10 === 0)) {
        saveState();
      }
    }
  }, 500);
}

// --- Привязка событий ---
if (tabSession) {
  tabSession.addEventListener('click', () => {
    playButtonClick();
    setMenuTab('session');
  });
}

if (tabSettings) {
  tabSettings.addEventListener('click', () => {
    playButtonClick();
    setMenuTab('settings');
  });
}

if (btnSettingsToPumpkins) {
  btnSettingsToPumpkins.addEventListener('click', () => {
    playButtonClick();
    sound.playWelcomeChord();
    openWorkspace();
  });
}

if (btnChooseBg && customBgInput) {
  btnChooseBg.addEventListener('click', () => {
    playButtonClick();
    customBgInput.click();
  });

  customBgInput.addEventListener('change', () => {
    const file = customBgInput.files && customBgInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      customBgDataUrl = reader.result;
      try {
        localStorage.setItem(CUSTOM_BG_KEY, customBgDataUrl);
      } catch (_) { }
      applyCustomBackground();
    };
    reader.readAsDataURL(file);
    customBgInput.value = '';
  });
}

if (btnResetBg) {
  btnResetBg.addEventListener('click', () => {
    playButtonClick();
    customBgDataUrl = '';
    localStorage.removeItem(CUSTOM_BG_KEY);
    applyCustomBackground();
  });
}

if (btnResetDefaults) {
  btnResetDefaults.addEventListener('click', () => {
    playButtonClick();
    resetAllSettingsToDefault();
  });
}

if (btnOpenAbout && aboutModal) {
  btnOpenAbout.addEventListener('click', () => {
    playButtonClick();
    aboutModal.classList.remove('hidden');
  });
}

if (btnAboutBack && aboutModal) {
  btnAboutBack.addEventListener('click', () => {
    playButtonClick();
    aboutModal.classList.add('hidden');
  });
}

if (aboutModal) {
  aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) aboutModal.classList.add('hidden');
  });
}

if (btnMenuExit) {
  btnMenuExit.addEventListener('click', () => {
    playButtonClick();
    openExitModal();
  });
}

if (btnExitCancel) {
  btnExitCancel.addEventListener('click', () => {
    playButtonClick();
    closeExitModal();
  });
}

if (btnExitConfirm) {
  btnExitConfirm.addEventListener('click', () => {
    playButtonClick();
    closeExitModal();
    exitApplication();
  });
}

if (exitModal) {
  exitModal.addEventListener('click', (e) => {
    if (e.target === exitModal) closeExitModal();
  });
}

if (btnSummaryStay) {
  btnSummaryStay.addEventListener('click', () => {
    playButtonClick();
    closeSummaryModal();
  });
}

if (btnSummaryNew) {
  btnSummaryNew.addEventListener('click', () => {
    playButtonClick();
    closeSummaryModal();
    summaryShownForSession = false;
    state.pumpkins.forEach(p => (p.running = false));
    state = {
      pumpkins: [],
      popHistory: []
    };
    editingTaskId = null;
    hideTextInputHint();
    localStorage.removeItem(STORAGE_KEY);
    if (btnContinueSaved) btnContinueSaved.classList.add('hidden');
    updateTopStatsMeta();
    openMenu('session');
  });
}

if (summaryModal) {
  summaryModal.addEventListener('click', (e) => {
    if (e.target === summaryModal) closeSummaryModal();
  });
}

if (btnLang) {
  btnLang.addEventListener('click', () => {
    playButtonClick();
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem(LANG_KEY, currentLang);
    applyLanguageUI();
  });
}

if (btnSfx) {
  btnSfx.addEventListener('click', () => {
    sfxEnabled = !sfxEnabled;
    localStorage.setItem(SFX_KEY, String(sfxEnabled));
    if (sfxEnabled) {
      playButtonClick();
    } else {
      sound.stopIntroSound();
    }
    applyLanguageUI();
  });
}

if (btnTopSound) {
  btnTopSound.addEventListener('click', () => {
    const isSoundActive = sfxEnabled || sound.musicEnabled;
    setAllSoundEnabled(!isSoundActive);
  });
}

if (btnAlarmTimer) {
  btnAlarmTimer.addEventListener('click', () => {
    playButtonClick();
    openAlarmModal();
  });
}

if (alarmHoursInput) {
  alarmHoursInput.addEventListener('input', () => {
    if (!alarmRunning) syncAlarmUI();
  });
}

if (alarmMinutesInput) {
  alarmMinutesInput.addEventListener('input', () => {
    if (!alarmRunning) syncAlarmUI();
  });
}

document.querySelectorAll('.preset-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    playButtonClick();
    const totalMins = parseInt(chip.dataset.mins || '15', 10) || 15;
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    if (alarmHoursInput) alarmHoursInput.value = String(h);
    if (alarmMinutesInput) alarmMinutesInput.value = String(m);
    if (!alarmRunning) {
      alarmRemainingSec = 0;
      syncAlarmUI();
    }
  });
});

if (btnAlarmStart) {
  btnAlarmStart.addEventListener('click', () => {
    playButtonClick();
    startAlarmCountdown();
  });
}

if (btnAlarmStop) {
  btnAlarmStop.addEventListener('click', () => {
    playButtonClick();
    stopAlarmCountdown();
  });
}

if (btnAlarmClose) {
  btnAlarmClose.addEventListener('click', () => {
    playButtonClick();
    closeAlarmModal();
  });
}

if (alarmModal) {
  alarmModal.addEventListener('click', (e) => {
    if (e.target === alarmModal) closeAlarmModal();
  });
}

if (btnMenuMusicToggle) {
  btnMenuMusicToggle.addEventListener('click', () => {
    playButtonClick();
    sound.toggleMusic();
    syncSettingsControlsUI();
  });
}

if (menuMusicSlider) {
  menuMusicSlider.addEventListener('input', () => {
    const pct = Number(menuMusicSlider.value);
    sound.setMusicVolume(pct / 100);
    if (pct > 0 && !sound.musicEnabled) {
      sound.musicEnabled = true;
      sound.startAmbient();
    }
    syncSettingsControlsUI();
  });
}

if (musicTrackSelect) {
  musicTrackSelect.addEventListener('change', () => {
    playButtonClick();
    sound.setTrack(musicTrackSelect.value);
    syncSettingsControlsUI();
  });
}

if (pumpkinSkinSelect) {
  pumpkinSkinSelect.addEventListener('change', () => {
    playButtonClick();
    currentSkinId = getValidSkinId(pumpkinSkinSelect.value);
    localStorage.setItem(SKIN_KEY, currentSkinId);
    syncSettingsControlsUI();
    if (workspace && !workspace.classList.contains('hidden')) {
      renderGarden();
    }
  });
}

if (popPowerSlider) {
  popPowerSlider.addEventListener('input', () => {
    popPower = clampPopPower(popPowerSlider.value);
    localStorage.setItem(POP_POWER_KEY, String(popPower));
    if (popPowerValue) popPowerValue.textContent = `${popPower}x`;
  });

  popPowerSlider.addEventListener('change', () => {
    playButtonClick();
  });
}

if (btnFirefliesMinus) {
  btnFirefliesMinus.addEventListener('click', () => {
    playButtonClick();
    firefliesCount = clampFireflies(firefliesCount - 1);
    localStorage.setItem(FIREFLIES_KEY, String(firefliesCount));
    renderFireflies();
    syncSettingsControlsUI();
  });
}

if (btnFirefliesPlus) {
  btnFirefliesPlus.addEventListener('click', () => {
    playButtonClick();
    firefliesCount = clampFireflies(firefliesCount + 1);
    localStorage.setItem(FIREFLIES_KEY, String(firefliesCount));
    renderFireflies();
    syncSettingsControlsUI();
  });
}

if (btnMenuZen) {
  btnMenuZen.addEventListener('click', () => {
    playButtonClick();
    cardsHiddenForBg = !cardsHiddenForBg;
    if (workspace) {
      workspace.classList.toggle('cards-hidden', cardsHiddenForBg);
    }
    syncSettingsControlsUI();
  });
}

btnMinus.addEventListener('click', () => {
  playButtonClick();
  const val = clampCount(Number(countInput.value) - 1);
  countInput.value = val;
  countSlider.value = val;
});

btnPlus.addEventListener('click', () => {
  playButtonClick();
  const val = clampCount(Number(countInput.value) + 1);
  countInput.value = val;
  countSlider.value = val;
});

countSlider.addEventListener('input', () => {
  countInput.value = countSlider.value;
});

countInput.addEventListener('change', () => {
  const val = clampCount(countInput.value);
  countInput.value = val;
  countSlider.value = val;
});

btnStartSession.addEventListener('click', () => {
  playButtonClick();
  sound.playWelcomeChord();
  createSession(countInput.value);
});

btnContinueSaved.addEventListener('click', () => {
  playButtonClick();
  const saved = loadState();
  if (saved) {
    state = saved;
    summaryShownForSession = false;
    sound.playWelcomeChord();
    openWorkspace();
  }
});

if (btnAddPumpkin) {
  btnAddPumpkin.addEventListener('click', () => {
    playButtonClick();
    addFreshPumpkin();
  });
}

btnUndo.addEventListener('click', () => {
  playButtonClick();
  undoLastPop();
});

btnSave.addEventListener('click', () => {
  playButtonClick();
  saveState(true);
});

btnRestart.addEventListener('click', () => {
  playButtonClick();
  openRestartModal();
});

if (btnRestartCancel) {
  btnRestartCancel.addEventListener('click', () => {
    playButtonClick();
    closeRestartModal();
  });
}

if (btnRestartConfirm) {
  btnRestartConfirm.addEventListener('click', () => {
    playButtonClick();
    closeRestartModal();
    summaryShownForSession = false;

    state.pumpkins.forEach(p => (p.running = false));
    state = {
      pumpkins: [],
      popHistory: []
    };
    editingTaskId = null;
    hideTextInputHint();
    localStorage.removeItem(STORAGE_KEY);
    if (btnContinueSaved) btnContinueSaved.classList.add('hidden');
    updateTopStatsMeta();
    openMenu('session');
  });
}

if (restartModal) {
  restartModal.addEventListener('click', (e) => {
    if (e.target === restartModal) closeRestartModal();
  });
}

btnMenu.addEventListener('click', () => {
  playButtonClick();
  state.pumpkins.forEach(p => (p.running = false));
  saveState();
  const saved = loadState();
  if (saved) btnContinueSaved.classList.remove('hidden');
  openMenu('session');
});

if (btnExit) {
  btnExit.addEventListener('click', () => {
    playButtonClick();
    openExitModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (aboutModal && !aboutModal.classList.contains('hidden')) {
      aboutModal.classList.add('hidden');
      return;
    }
    if (alarmModal && !alarmModal.classList.contains('hidden')) {
      closeAlarmModal();
      return;
    }
    if (restartModal && !restartModal.classList.contains('hidden')) {
      closeRestartModal();
      return;
    }
    if (exitModal && !exitModal.classList.contains('hidden')) {
      closeExitModal();
      return;
    }
    if (summaryModal && !summaryModal.classList.contains('hidden')) {
      closeSummaryModal();
      return;
    }
  }

  if (editingTaskId !== null) return;
  const tag = e.target && e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;

  if (e.key === 'h' || e.key === 'H' || e.key === 'р' || e.key === 'Р') {
    playButtonClick();
    toggleBackgroundView();
  }
});

let introFinished = false;

function finishIntro() {
  if (introFinished) return;
  introFinished = true;

  sound.stopIntroSound();

  if (introVideo) {
    introVideo.pause();
  }

  if (introOverlay) {
    introOverlay.classList.remove('active');
    introOverlay.classList.add('fade-out');
    introOverlay.style.pointerEvents = 'none';
    setTimeout(() => {
      introOverlay.classList.add('hidden');
      introOverlay.style.display = 'none';
      sound.playWelcomeChord();
    }, 400);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  applyCustomBackground();
  renderFireflies();
  applyLanguageUI();

  const saved = loadState();
  if (saved) {
    state = saved;
    btnContinueSaved.classList.remove('hidden');
  }

  if (introVideo && introOverlay) {
    sound.playIntroSound();
    introVideo.addEventListener('ended', finishIntro);
    setTimeout(finishIntro, 5000);

    if (btnSkipIntro) {
      btnSkipIntro.addEventListener('click', () => {
        playButtonClick();
        finishIntro();
      });
    }
  } else {
    finishIntro();
  }
});