import { Links } from './links.dto';

export class ResponseCustomerDto {
  id: string;
  document: number;
  name: string;
  _links: Links[];
}
