import { Logger, lowWord } from '@ahmic/lib-native';

import {
  EDIT_MENU_COPY,
  EDIT_MENU_HISTORY_CANCEL_EDIT,
  EDIT_MENU_HISTORY_CLEAR,
  EDIT_MENU_HISTORY_COPY,
  EDIT_MENU_HISTORY_EDIT,
  EDIT_MENU_PASTE,
  HELP_MENU_ABOUT_CALCULATOR,
  HELP_MENU_SEND_FEEDBACK,
  HELP_MENU_VIEW_HELP,
  VIEW_MENU_BASIC,
  VIEW_MENU_DATE_CALCULATION,
  VIEW_MENU_DIGIT_GROUPING,
  VIEW_MENU_HISTORY,
  VIEW_MENU_PROGRAMMER,
  VIEW_MENU_SCIENTIFIC,
  VIEW_MENU_STANDARD,
  VIEW_MENU_STATISTICS,
  VIEW_MENU_UNIT_CONVERSION,
  VIEW_MENU_WORKSHEET_FUEL_CONSUMPTION,
  VIEW_MENU_WORKSHEET_FUEL_ECONOMY,
  VIEW_MENU_WORKSHEET_MORTGAGE,
  VIEW_MENU_WORKSHEET_VEHICLE_LEASE,
} from '../calculator.constants';
import { state } from '../state';

const logger = new Logger('MenuHandler');

export function handleMenu(wordParam: number, longParam: number): number {
  switch (lowWord(wordParam)) {
    case VIEW_MENU_STANDARD:
      logger.debug('VIEW_MENU_STANDARD', VIEW_MENU_STANDARD);
      break;

    case VIEW_MENU_SCIENTIFIC:
      logger.debug('VIEW_MENU_SCIENTIFIC', VIEW_MENU_SCIENTIFIC);
      break;

    case VIEW_MENU_PROGRAMMER:
      logger.debug('VIEW_MENU_PROGRAMMER', VIEW_MENU_PROGRAMMER);
      break;

    case VIEW_MENU_STATISTICS:
      logger.debug('VIEW_MENU_STATISTICS', VIEW_MENU_STATISTICS);
      break;

    case VIEW_MENU_HISTORY:
      logger.debug('VIEW_MENU_HISTORY', VIEW_MENU_HISTORY);
      break;

    case VIEW_MENU_DIGIT_GROUPING:
      logger.debug('VIEW_MENU_DIGIT_GROUPING', VIEW_MENU_DIGIT_GROUPING);
      break;

    case VIEW_MENU_BASIC:
      logger.debug('VIEW_MENU_BASIC', VIEW_MENU_BASIC);
      break;

    case VIEW_MENU_UNIT_CONVERSION:
      logger.debug('VIEW_MENU_UNIT_CONVERSION', VIEW_MENU_UNIT_CONVERSION);
      break;

    case VIEW_MENU_DATE_CALCULATION:
      logger.debug('VIEW_MENU_DATE_CALCULATION', VIEW_MENU_DATE_CALCULATION);
      break;

    case VIEW_MENU_WORKSHEET_MORTGAGE:
      logger.debug('VIEW_MENU_WORKSHEET_MORTGAGE', VIEW_MENU_WORKSHEET_MORTGAGE);
      break;

    case VIEW_MENU_WORKSHEET_VEHICLE_LEASE:
      logger.debug('VIEW_MENU_WORKSHEET_VEHICLE_LEASE', VIEW_MENU_WORKSHEET_VEHICLE_LEASE);
      break;

    case VIEW_MENU_WORKSHEET_FUEL_ECONOMY:
      logger.debug('VIEW_MENU_WORKSHEET_FUEL_ECONOMY', VIEW_MENU_WORKSHEET_FUEL_ECONOMY);
      break;

    case VIEW_MENU_WORKSHEET_FUEL_CONSUMPTION:
      logger.debug('VIEW_MENU_WORKSHEET_FUEL_CONSUMPTION', VIEW_MENU_WORKSHEET_FUEL_CONSUMPTION);
      break;

    // ============================================================

    case EDIT_MENU_COPY:
      logger.debug('EDIT_MENU_COPY', EDIT_MENU_COPY);
      break;

    case EDIT_MENU_PASTE:
      logger.debug('EDIT_MENU_PASTE', EDIT_MENU_PASTE);
      break;

    case EDIT_MENU_HISTORY_COPY:
      logger.debug('EDIT_MENU_HISTORY_COPY', EDIT_MENU_HISTORY_COPY);
      break;

    case EDIT_MENU_HISTORY_EDIT:
      logger.debug('EDIT_MENU_HISTORY_EDIT', EDIT_MENU_HISTORY_EDIT);
      break;

    case EDIT_MENU_HISTORY_CANCEL_EDIT:
      logger.debug('EDIT_MENU_HISTORY_CANCEL_EDIT', EDIT_MENU_HISTORY_CANCEL_EDIT);
      break;

    case EDIT_MENU_HISTORY_CLEAR:
      logger.debug('EDIT_MENU_HISTORY_CLEAR', EDIT_MENU_HISTORY_CLEAR);
      break;

    // ============================================================

    case HELP_MENU_VIEW_HELP:
      logger.debug('HELP_MENU_VIEW_HELP', HELP_MENU_VIEW_HELP);
      break;

    case HELP_MENU_SEND_FEEDBACK:
      logger.debug('HELP_MENU_SEND_FEEDBACK', HELP_MENU_SEND_FEEDBACK);
      break;

    case HELP_MENU_ABOUT_CALCULATOR:
      logger.debug('HELP_MENU_ABOUT_CALCULATOR', HELP_MENU_ABOUT_CALCULATOR);
      break;
  }

  return 0;
}
