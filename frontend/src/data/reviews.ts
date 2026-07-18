export interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  role?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Katarzyna T',
    text: 'Jestem zachwycona wizytą! Salon bardzo zadbany, a narzędzia sterylne, co daje duże poczucie bezpieczeństwa. Pedicure wykonany perfekcyjnie - każdy detal dopracowany. Do tego przemiła atmosfera i profesjonalne podejście. Szczerze polecam! 🌿✨',
    rating: 5,
  },
  {
    id: 2,
    name: 'Oksana K',
    text: 'U Yevhenii paznokcie zawsze wychodzą  dokładne, piękne i bardzo trwałe. Do tego jest przemiła atmosfera i naprawdę profesjonalne podejście. Bardzo polecam',
    rating: 5,
  },
  {
    id: 3,
    name: 'Marta K',
    text: 'Jak zawsze TOP paznokcie PRZEPIĘKNE, Cudowna atmosfera!!!! Wracam zawsze bo wiem, że nikt lepiej paznokci mi nie zrobi jak przekochana Żenia!!! Jeszcze raz dziękuję za cudowne paznokcie i super czas w pięknym salonie 🫠🫠🥰😍😍😍😍',
    rating: 5,
  },
  {
    id: 4,
    name: 'Julia D',
    text: 'Było super! Paznokcie wyszły przepiękne, starannie wykonane i dokładnie takie, jak chciałam. Pani Żenia jest niezwykle miła, profesjonalna i dba o każdy detal. Atmosfera podczas wizyty była bardzo przyjemna. Z całego serca polecam i na pewno wrócę! 🤍',
    rating: 5,
  },
  {
    id: 5,
    name: 'Adrianna R',
    text: 'Mało salonów spełnia moje oczekiwania odnośnie pedi - tym razem to strzał w dziesiątkę!!!!! jestem bardzo zadowolona i na pewno zostaje na dłużej! 🤍🤍🤍',
    rating: 5,
  },
];

export { reviews };
