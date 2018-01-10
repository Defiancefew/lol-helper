import _ from 'lodash';

const replaceObject: { [key: string]: string } = {
  '<groupLimit>': '<span class="__limited_item" >',
  '</groupLimit>': '</span>',
  '<stats>': '<span class="__item_stats">',
  '</stats>': '</span>',
  '<mana>': '<span>',
  '</mana>': '</span>',
  '<unique>': '<span class="__unique_passive">',
  '</unique>': '</span>',
  '<passive>': '<span>',
  '</passive>': '</span>',
};

const itemTagsRegexp = new RegExp(_.keys(replaceObject).join('|'), 'gi');

export const parseItemTags = (text: string): string => text.replace(itemTagsRegexp, matched => replaceObject[matched]);
