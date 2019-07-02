import { Pipe, PipeTransform } from '@angular/core';
import { ColoredAnagramm } from './anagramm-listing/anagramm-listing.component';

@Pipe({
  name: 'noDups'
})
export class NoDupsPipe implements PipeTransform {

  transform(value: ColoredAnagramm[]): ColoredAnagramm[] {
    return value.filter((item, index, self) => self.findIndex((i) => i.value === item.value) === index);
  }

}
