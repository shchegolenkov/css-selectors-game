import { Level } from '../types/types';

const LEVELS: Level[] = [
  {
    task: 'Select the box',
    selectors: ['box'],
    markup: [
      '<plate data-number="1">&lt;plate&gt;&lt;/plate&gt;</plate>',
      '<box data-number="2">&lt;box&gt;&lt;/box&gt;</box>',
    ],
    table: [['plate'], ['box-target']],
  },
  {
    task: 'Select the orange on the plate',
    selectors: ['plate orange', 'plate > orange', 'plate>orange'],
    markup: [
      '<plate data-number="1">&lt;plate&gt;<orange data-number="2" class="editor__inner">&lt;orange /&gt;</orange>&lt;/plate&gt;</plate>',
      '<box data-number="3">&lt;box&gt;<orange data-number="4" class="editor__inner">&lt;orange /&gt;</orange>&lt;/box&gt;</box>',
    ],
    table: [
      ['plate', 'orange-target'],
      ['box', 'orange'],
    ],
  },
  {
    task: 'Select the small red pepper',
    selectors: [
      '.small.red',
      'plate > pepper.small.red',
      'pepper.small.red',
      'plate .small.red',
      '[class="small red"]',
      'plate:first-of-type .small.red',
      'plate:first-of-type .small',
      'plate:first-of-type .red',
      'plate:first-of-type pepper',
      'plate:first-of-type pepper.small.red',
      'plate:first-of-type pepper.red',
      'plate:first-of-type pepper.small',
      'plate:first-of-type *',
      'plate:first-of-type > .small.red',
      'plate:first-of-type > .small',
      'plate:first-of-type > .red',
      'plate:first-of-type > pepper.small.red',
      'plate:first-of-type > pepper.red',
      'plate:first-of-type > pepper.small',
      'plate:first-of-type > pepper',
      'plate:first-of-type > *',
      'plate:first-of-type>.small.red',
      'plate:first-of-type>.small',
      'plate:first-of-type>.red',
      'plate:first-of-type>pepper.small.red',
      'plate:first-of-type>pepper.red',
      'plate:first-of-type>pepper.small',
      'plate:first-of-type>pepper',
      'plate:first-of-type>*',
    ],
    markup: [
      '<plate data-number="1">&lt;plate&gt;<pepper data-number="2" class="editor__inner">&lt;pepper class="small red" /&gt;</pepper>&lt;/plate&gt;</plate>',
      '<plate data-number="3">&lt;plate&gt;<pepper data-number="4" class="editor__inner">&lt;pepper class="small green" /&gt;</pepper>&lt;/plate&gt;</plate>',
      '<plate data-number="5">&lt;plate&gt;<pepper data-number="6" class="editor__inner">&lt;pepper class="red" /&gt;</pepper>&lt;/plate&gt;</plate>',
    ],
    table: [
      ['plate', 'pepper-target-small-red'],
      ['plate', 'pepper--small-green'],
      ['plate', 'pepper--red'],
    ],
  },
  {
    task: 'Select the only one strawberry on the first plate',
    selectors: [
      'strawberry:only-child',
      'plate:first-child strawberry',
      'plate:first-child > strawberry',
      'plate:first-child *',
      'plate:first-of-type strawberry',
    ],
    markup: [
      '<plate data-number="1">&lt;plate&gt;<strawberry data-number="2" class="editor__inner">&lt;strawberry /&gt;</strawberry>&lt;/plate&gt;</plate>',
      '<plate data-number="3">&lt;plate&gt;<strawberry data-number="4" class="editor__inner">&lt;strawberry /&gt;</strawberry><strawberry data-number="5" class="editor__inner">&lt;strawberry /&gt;</strawberry><strawberry data-number="6" class="editor__inner">&lt;strawberry /&gt;</strawberry>&lt;/plate&gt;</plate>',
    ],
    table: [
      ['plate', 'strawberry-target'],
      ['plate', 'strawberry', 'strawberry', 'strawberry'],
    ],
  },
  {
    task: 'Select the red pepper on the plate',
    selectors: [
      'plate .red',
      'plate > pepper.red',
      'plate>pepper.red',
      'plate pepper.red',
      'plate:first-of-type *',
      'plate:first-of-type pepper',
      'plate:first-of-type pepper.red',
      'plate:first-of-type .red',
    ],
    markup: [
      '<plate data-number="1">&lt;plate&gt;<pepper data-number="2" class="editor__inner">&lt;pepper class="red" /&gt;</pepper>&lt;/plate&gt;</plate>',
      '<pepper data-number="3">&lt;pepper class="red" /&gt;</pepper>',
      '<plate data-number="4">&lt;plate&gt;<pepper data-number="5" class="editor__inner">&lt;pepper class="green" /&gt;</pepper>&lt;/plate&gt;</plate>',
    ],
    table: [['plate', 'pepper-target-red'], ['pepper--red'], ['plate', 'pepper--green']],
  },
  {
    task: 'Select the plate after the box',
    selectors: ['box+plate', 'box~plate', 'box + plate', 'box ~ plate'],
    markup: [
      '<plate data-number="1">&lt;plate&gt;&lt;/plate&gt;</plate>',
      '<box data-number="2">&lt;box&gt;&lt;/box&gt;</box>',
      '<plate data-number="3">&lt;plate&gt;&lt;/plate&gt;</plate>',
    ],
    table: [['plate'], ['box'], ['plate-target']],
  },
  {
    task: 'Select all the elements',
    selectors: [
      '*',
      'plate, box, orange, banana, pepper',
      'plate,box,orange,banana,pepper',
      'plate, box, orange, banana, .green',
      'plate, box, orange, banana, pepper.green',
      'plate, box, orange, banana, plate .green',
      'plate, box, orange, banana, plate pepper.green',
    ],
    markup: [
      '<plate data-number="1">&lt;plate&gt;<orange data-number="2" class="editor__inner">&lt;orange /&gt;</orange>&lt;/plate&gt;</plate>',
      '<box data-number="3">&lt;box&gt;<banana data-number="4" class="editor__inner">&lt;banana /&gt;</banana>&lt;/box&gt;</box>',
      '<plate data-number="5">&lt;plate&gt;<pepper data-number="6" class="editor__inner">&lt;pepper class="green" /&gt;</pepper>&lt;/plate&gt;</plate>',
    ],
    table: [
      ['plate-target', 'orange-target-red'],
      ['box-target', 'banana-target'],
      ['plate-target', 'pepper-target-green'],
    ],
  },
  {
    task: 'Select all the oranges after the plate',
    selectors: ['plate~orange', 'plate ~ orange'],
    markup: [
      '<orange data-number="1">&lt;orange /&gt;</orange>',
      '<plate data-number="2">&lt;plate&gt;<banana data-number="3" class="editor__inner">&lt;banana /&gt;</banana>&lt;/plate&gt;</plate>',
      '<orange data-number="4">&lt;orange /&gt;</orange>',
      '<orange data-number="5">&lt;orange /&gt;</orange>',
    ],
    table: [['orange'], ['plate', 'banana'], ['orange-target'], ['orange-target']],
  },
  {
    task: 'Select all the strawberries on the second plate',
    selectors: [
      'strawberry:not(:only-child)',
      'plate:nth-of-type(2) strawberry',
      'plate:nth-of-type(2) *',
      'plate:last-of-type *',
      'plate:last-of-type strawberry',
    ],
    markup: [
      '<plate data-number="1">&lt;plate&gt;<strawberry data-number="2" class="editor__inner">&lt;strawberry /&gt;</strawberry>&lt;/plate&gt;</plate>',
      '<plate data-number="3">&lt;plate&gt;<strawberry data-number="4" class="editor__inner">&lt;strawberry /&gt;</strawberry><strawberry data-number="5" class="editor__inner">&lt;strawberry /&gt;</strawberry><strawberry data-number="6" class="editor__inner">&lt;strawberry /&gt;</strawberry>&lt;/plate&gt;</plate>',
    ],
    table: [
      ['plate', 'strawberry'],
      ['plate', 'strawberry-target', 'strawberry-target', 'strawberry-target'],
    ],
  },
  {
    task: 'Select the last cherry on the plate',
    selectors: [
      'cherry:last-child',
      'plate cherry:last-child',
      'plate cherry:last-of-type',
      'cherry:last-of-type',
      'plate :last-child',
      'plate *:last-child',
    ],
    markup: [
      '<plate data-number="1">&lt;plate&gt;<cherry data-number="2" class="editor__inner">&lt;cherry /&gt;</cherry><cherry data-number="3" class="editor__inner">&lt;cherry /&gt;</cherry>&lt;/plate&gt;</plate>',
    ],
    table: [['plate', 'cherry', 'cherry-target']],
  },
];

export default LEVELS;
