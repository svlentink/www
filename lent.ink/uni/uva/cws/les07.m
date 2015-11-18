% Sander Lentink 10422439
% The a before the file name is because it wont run otherwise
% pdf is attached to this file

%%
%1. Kies een waarde voor p.
%Gebruik de procedure binornd(1,p,1,n) om n keer te loten (met kans p) of de gebeurtenis
%optreedt of niet. De procedure geeft een 1 (A treedt op) met kans p en een 0 (A treedt
%niet op)met kans 1 − p.
%Kies een waarde voor n en simuleer een rij uitkomsten.

p = rand(1);
nUnround = rand(1) * 500;
n = round(nUnround);
out1 = binornd(1,p,1,n);
out1String = ['output of ', int2str(n), ' items: ',int2str(out1)];
disp(out1String)

%2. Tel het aantal keren dat A optreedt.
%Je kan hiervoor de procedure tabulate gebruiken.
nl = '\n';
occur = tabulate(out1);
percent = occur(2,3)
out2tableHead = '     Value     Count   Percentage';
out2table = occur;%couldnt make one long string because of table
out2perc = ['Percentage: ', int2str(percent)];
disp(out2tableHead)
disp(out2table)
disp(out2perc)

%%
%3. Herhaal dit voor verschillende waarden van p en n.

for k = 1:(round(rand(1)*50))%random times
   iterationString = ['Iteration #',int2str(k)];
   disp(iterationString)
   p = rand(1);
   n = round(rand(1) * 10000);
   currOut = binornd(1,p,1,n);
   currTable = tabulate(currOut);
   currPerc = currTable(1,3);
   disp(currPerc)
   samplePerc(k) = currPerc;
end
overallMeanPerc = mean(samplePerc)

%%
%4. We gaan nu een plaatje maken van de rij experimenten.
%Kies een grote waarde voor N en waarde voor p.
%Simuleer als boven een rij van N experimenten.
%Bereken nu voor n = 1, . . . , N de fractie van het aantal keren dat A optreedt.
%Dit kan bijvoorbeeld als volgt:
N = round(rand(1) * 10000);
p = rand(1);
experiments=binornd(1,p,1,N);
cumulativecount=cumsum(experiments);
cumulativefrequencies=cumulativecount./[1:N];
plot(cumulativefrequencies,'.')
line([0 N],[p p])
%Hiermee zien we dat wanneer we N groot nemen dat hij convergeert naar p.






%%

b = rand(1)^10; %P(B) gebeurtenis dat de persoon de ziekte echt heeft
bc = 1-b; %P(B^c)
ab = 0.9; %P (A|B) 
abc = 0.001; %P (A|B^c )

%Simuleer deze situatie om te onderzoeken of dit tegenintu ̈ıtieve resultaat echt klopt.
%1. Gebruik de procedure binornd(1,P (B),1,n) om voor n pati ̈enten te loten (met kans P (B))
%of ze de ziekte hebben of niet. De procedure geeft een een met kans P (B) en een nul met
%kans 1 − P (B).

n = round(rand(1)*1000000);%n element of interval [0 , 1*10^6]
patientsTable = tabulate(binornd(1,b,1,n));
patientsp = patientsTable(2,3)/100;%/100 because percentage

out5str = ['Opdrach 1.2.1; n=', int2str(n), ', P(B)=', num2str(b), ', we found:', num2str(patientsp)];
disp(out5str)


%2. Voor de pati ̈enten in die rij die de ziekte hebben loot je met kans P (A|B) of de test
%positief is. Voor de pati ̈enten in die rij die de ziekte niet hebben loot je met kans P (A|B c )
%of de test positief is.

sick = patientsTable(2,2);
healthy = patientsTable(1,2);
out6str = ['Opdracht 1.2.2 verwachte kans; P(A|B)=', num2str((sick * ab)), ' P(A|B^c)= ', num2str((healthy * abc))];
disp(out6str)

pab = tabulate(binornd(1,ab,1,sick));
pab = pab(2,2);%P(A|B)
pabc = tabulate(binornd(1,abc,1,healthy));
pabc = pabc(2,2);%P(A|B^c)

out7str = ['Opdracht 1.2.2 gevonden kans; P(A|B)=', int2str(pab), ' P(A|B^c)= ', num2str(pabc), ', amount sick=', int2str(sick)];
disp(out7str)

%3. Je hebt nu per pati ̈ent twee uitkomsten: wel of niet de ziekte en positief of negatief getest.
%Tel nu in de rij van de positief geteste pati ̈enten het aantal pati ̈enten dat de ziekte ook
%echt heeft. Deel dat op het aantal positief geteste pati ̈enten om de voorwaardelijke kans
%P (B|A) te benaderen.

out8str = ['Opdracht 1.2.3; P(B|A)=', num2str((pab+pabc)/sick)];
disp(out8str)

%4. Herhaal het bovenstaan de voor verschillende waarden van P (B).

out9str = ['P(B) is made random with current value of:', num2str(b), ', rerun for new values'];
disp(out9str);




