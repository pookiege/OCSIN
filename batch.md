@startuml

[*] -> ConditionDeLancement
ConditionDeLancement --> Etape1 : cdRet == 0
Etape1: Purge entrée
Etape1 --> Etape2 
Etape2 : Récupération fichier SIRH
Etape2 --> Etape3 
Etape3 : Anonymisation
Etape3 --> Etape4 
Etape4 : Récupération Access token
Etape4 --> Etape5 
Etape5 : StartJob
Etape5 --> Etape6 
Etape6 : StatusJob
Etape6 --> Etape6 : status == running
Etape6 --> Etape7 : cdRet == 0 ET status == done
Etape6 --> [*] : status not in (done,running)
Etape7 : Zip et purge
Etape7 --> [*]


@enduml
