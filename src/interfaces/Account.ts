export interface Account {
    id: number;
    markers: marker[] | null;
    typeRecord: 'locale' | 'ldap';
    login: string | null;
    password: string | null;
}
interface marker {
    text: string
}