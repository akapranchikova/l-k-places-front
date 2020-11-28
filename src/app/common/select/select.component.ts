import {
  AfterContentChecked,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent,
    }
  ]
})
export class SelectComponent implements OnInit, AfterContentChecked, ControlValueAccessor, OnChanges, OnDestroy {

  @Output()
  public readonly select: EventEmitter<any> = new EventEmitter<any>();
  @Input() items = [];
  @Input() valueField = '';
  @Input() labelField = '';
  @Input() placeholder = 'Выберите из списка';
  @Input() nullable = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() nullOptionName = 'Не выбрано';
  @Input() nameSelect = '';
  @Input() scroll = false;
  @Input() underline = true;
  @Input() selectedElement = null;
  @Input() readonly = true;
  @Input() width = null;
  @Input() search = false;
  @Input() blockValues = [];
  @Input() blockMode = false;
  selectedValue;
  @ViewChild('select') sel;
  @ViewChild('dropdown') dropdown;
  tempItems = [];
  show = false;
  selectSecond;

  constructor(private router: Router) {
    this.scrollEv = this.scrollEv.bind(this);
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.scrollEv();
      }
    });
  }

  ngOnInit(): void {
    if (document.getElementsByTagName('mat-dialog-container')[0]) {
      document.getElementsByTagName('mat-dialog-container')[0].addEventListener('scroll', this.scrollEv);
    }
    document.addEventListener('scroll', this.scrollEv);
    window.addEventListener('resize', this.scrollEv);
  }

  ngOnDestroy(): void {
    if (document.getElementsByTagName('mat-dialog-container')[0]) {
      document.getElementsByTagName('mat-dialog-container')[0].removeEventListener('scroll', this.scrollEv);
    }
    window.removeEventListener('resize', this.scrollEv);
    document.removeEventListener('scroll', this.scrollEv);
  }

  selectByValue(value: any) {
    this.selectedElement = value;
    this.selectedValue = value;
    this.show = false;
    if (document.getElementsByClassName('select-in-body')[0]) {
      document.getElementsByClassName('select-in-body')[0].remove();
    }
    this._propagateChange(value ? value[this.valueField] : null);
    if (this.sel.nativeElement.childNodes[2].slot && value) {
      this.blockValues.splice(this.blockValues.findIndex(bl => bl === +this.sel.nativeElement.childNodes[2].slot), 1);
    }
    this.select.emit(value ? value[this.valueField] : null);
    this.tempItems = [];
  }

  writeValue(obj: any): void {
    this.selectedElement = this.items ? this.items.find(e => e[this.valueField] === this.selectedValue) : this.selectedElement;
    this.selectedValue = obj;
  }

  registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }

  ngAfterContentChecked(): void {
    if (!this.selectedElement) {
      this.selectedElement = this.items ? this.items.find(e => e[this.valueField] === this.selectedValue) : this.selectedElement;
    }
  }

  showSelect(e) {
    if (this.disabled) {
      return;
    }
    this.show = !this.show;
    Array.from(document.getElementsByClassName('formSelect-dropdown-select')).forEach(list => list.remove());
    if (!this.show) {
      return;
    }
    const rect = this.sel.nativeElement.getBoundingClientRect();
    const el = this.dropdown.nativeElement.cloneNode(true);
    el.addEventListener('scroll', (ev) => ev.stopPropagation());
    const top = this.nameSelect ? 70 : 48;
    const maxHeight = window.innerHeight - rect.y - top;
    el.style.top = rect.y + top + 'px';
    el.style.left = rect.x + 'px';
    el.style.maxHeight = (maxHeight > 280 ? 280 : maxHeight) + 'px';
    el.style.width = this.width ? this.width + 'px' : rect.width + 'px';
    el.style.maxHeight = (maxHeight > 280 ? 280 : maxHeight) + 'px';
    el.style.display = 'block';
    el.style.zIndex = 1000;
    el.classList.add('select-in-body');
    this.selectSecond = el;

    const ulList = document.createElement('ul');
    ulList.addEventListener('click', event => {
      event.stopPropagation();
    });
    let li = document.createElement('li');
    if (this.search) {
      const input = document.createElement('input');
      input.addEventListener('input', (eventInput) => {
        let items;
        if (this.tempItems.length) {
          items = this.tempItems.filter(item => item[this.labelField].toString().toLowerCase().includes(input.value.toLowerCase()));
        } else {
          items = this.items.filter(item => item[this.labelField].toString().toLowerCase().includes(input.value.toLowerCase()));
        }
        this.addItemsForSelect(ulList, items);
      });
      input.placeholder = 'Поиск';
      input.className = 'select__input';
      li.appendChild(input);
      ulList.appendChild(li);
    }
    li = document.createElement('li');
    if (this.nullable) {
      li.addEventListener('click', (ev) => {
        this.selectByValue(null);
        ev.stopPropagation();
      });
      const span = document.createElement('span');
      span.innerText = this.nullOptionName;
      li.appendChild(span);
      ulList.appendChild(li);
    }

    this.addItemsForSelect(ulList, (this.tempItems.length ? this.tempItems : this.items));

    el.appendChild(ulList);

    document.getElementsByTagName('body')[0].appendChild(el);
  }

  addItemsForSelect(ul, items) {
    Array.from(document.getElementsByClassName('select__item')).forEach(el => el.remove());
    let li = document.createElement('li');
    items.forEach(item => {
      li = document.createElement('li');
      li.className = 'select__item';
      li.style.height = '100%';
      if (this.nullable) {
        const span = document.createElement('span');
        span.innerText = item[this.labelField];
        li.appendChild(span);
      } else {
        const label = document.createElement('label');
        const span = document.createElement('span');
        span.innerText = item[this.labelField];
        label.appendChild(span);
        li.appendChild(label);
      }
      ul.appendChild(li);

      if (this.blockMode) {
        const blockItemInd = this.blockValues.findIndex(bl => bl === item[this.valueField]);
        if (this.blockValues.length && blockItemInd !== -1) {
          li.className = 'select__item-block';
        } else {
          li.addEventListener('click', (ev) => {
            this.selectByValue(item);
            this.blockValues.push(item[this.valueField]);
            ev.stopPropagation();
          });
        }
      } else {
        li.addEventListener('click', (ev) => {
          this.selectByValue(item);
          ev.stopPropagation();
        });
      }
    });
  }

  registerOnTouched(fn: any): void {
  }

  private _propagateChange = (_: any) => {
  }

  scrollEv(ev?) {
    if (document.getElementsByClassName('select-in-body')[0]) {
      document.getElementsByClassName('select-in-body')[0].remove();
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!event.path.includes(this.sel.nativeElement)) {
      this.show = false;
      if (this.selectSecond) {
        this.selectSecond.remove();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.items && changes.items.previousValue) || (changes.valueField && changes.valueField.previousValue)) {
      this.selectedElement = null;
    }
  }
}
