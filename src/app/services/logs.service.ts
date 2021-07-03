import {Injectable} from '@angular/core';
import {Log, LogTag} from '../models/task.model';
import {DateTime} from 'luxon';
import {splitKey} from '../utils/key';

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

  constructor() {
  }

  private readonly display: Record<LogTag, LogTagDisplay> = {
    PROGRESS: {
      category: 'Registró un avance',
      icon: 'edit'
    },
    COMPLETED: {
      category: 'Completó un objetivo! 🥳',
      icon: 'check'
    },
    REWARD: {
      category: 'Ganó una recompensa',
      icon: 'favorite_border'
    }
  };

  public parseLog(log: Log): LogDisplay {
    const display: LogTagDisplay = this.display[splitKey(log.tag)[0].toUpperCase()] ?? {
      category: log.tag,
      icon: 'favorite_border'
    };
    return {
      tag: log.tag,
      log: log.tag === 'progress' ? `"${log.log}"` : log.log,
      time: DateTime.fromMillis(log.timestamp),
      ...display
    };
  }
}
