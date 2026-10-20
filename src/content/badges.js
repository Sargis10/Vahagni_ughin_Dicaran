// Badges are game rewards (fictional achievements), not historical claims.
export const badges = [
  {
    id: 'song-keeper',
    name: 'Երգի պահապան',
    description: 'Ավարտել ես «Երգի հետքերով» գլուխը։',
    chapterId: 'chapter-1',
    icon: 'rosette',
  },
  {
    id: 'sharp-eye',
    name: 'Սուր աչք',
    description: 'Եղեգի մարտահրավերի բոլոր հարցերին ճիշտ ես պատասխանել մեկ փորձով։',
    chapterId: 'chapter-1',
    icon: 'eye',
  },
  {
    id: 'careful-chronicler',
    name: 'Ուշադիր մատենագիր',
    description: 'Որոշել ես երգը գրի առնել այնպես, ինչպես ասում է աղբյուրը, և գիտնականների տեսակետները նշել առանձին։',
    chapterId: 'chapter-1',
    icon: 'quill',
  },
  {
    id: 'storyteller',
    name: 'Պատմող',
    description: 'Որոշել ես երգը վերապատմել քո բառերով և հորինվածքը հստակ նշել որպես հորինվածք։',
    chapterId: 'chapter-1',
    icon: 'flame',
  },
];

export const badgesById = Object.fromEntries(badges.map((badge) => [badge.id, badge]));
