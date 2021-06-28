import { Injectable } from '@angular/core';
import {Log, LogTag} from '../models/task.model';
import {DateTime} from 'luxon';

interface LogTagDisplay {
  category: string;
  icon: string;
}

interface LogDisplay extends LogTagDisplay {
  tag: LogTag;
  log: string;
  time: DateTime;
}

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private readonly display: Record<LogTag, LogTagDisplay> = {
    progress: {
      category: 'Registro de avance',
      icon: 'edit'
    },
    completed: {
      category: 'Objetivo completado! 🥳',
      icon: 'check'
    },
    reward: {
      category: 'Ganó una recompensa',
      icon: 'favorite_border'
    }
  };

  constructor() {}

  public parseLog(log: Log): LogDisplay {
    const display: LogTagDisplay = this.display[log.tag] ?? {category: log.tag, icon: 'favorite_border'};
    return {
      tag: log.tag,
      category: display.category,
      log: log.tag === 'progress' ? `"${log.log}"` : log.log,
      icon: display.icon,
      time: DateTime.fromMillis(log.timestamp)
    };
  }
}
