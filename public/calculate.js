var grades=[65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03, 49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];
var MAX,AU,A,AD,BU,B,BD,CU,C,CD,D,F;
function myFunction(){
	MAX =Number(document.getElementById('MAX').value);
	AU  =Number(document.getElementById('AU').value);
	A   =Number(document.getElementById('A').value);
	AD  =Number(document.getElementById('AD').value);
	BU  =Number(document.getElementById('BU').value);
	B   =Number(document.getElementById('B').value);
	BD  =Number(document.getElementById('BD').value);
	CU  =Number(document.getElementById('CU').value);
	C   =Number(document.getElementById('C').value);
	CD  =Number(document.getElementById('CD').value);
	D   =Number(document.getElementById('D').value);
	F   =Number(document.getElementById('F').value);
	if(MAX<0 || AU<0 || A<0 || AD<0 || BU<0 || B<0 || BD<0 || CU<0 || C<0 || CD<0 || D<0 || F<0){
		alert("Sorry, range value must be bigger than 0!");
		document.getElementById("N1").innerHTML="Wrong Range!!!!";
		document.getElementById("N2").innerHTML="";
		document.getElementById("N3").innerHTML="";
		document.getElementById("N4").innerHTML="";
		document.getElementById("N5").innerHTML="";
		document.getElementById("N6").innerHTML="";
		document.getElementById("N7").innerHTML="";
		document.getElementById("N8").innerHTML="";
		document.getElementById("N9").innerHTML="";
		document.getElementById("N10").innerHTML="";
		document.getElementById("N11").innerHTML="";
	}
	if(MAX<AU || AU<A || A<AD || AD<BU || BU<B || B<BD || BD<CU || CU<C || C<CD || CD<D || D<F){
		alert("Sorry, the current range value must be smaller than previous range!");
		document.getElementById("N1").innerHTML="Wrong Range!!!!";
		document.getElementById("N2").innerHTML="";
		document.getElementById("N3").innerHTML="";
		document.getElementById("N4").innerHTML="";
		document.getElementById("N5").innerHTML="";
		document.getElementById("N6").innerHTML="";
		document.getElementById("N7").innerHTML="";
		document.getElementById("N8").innerHTML="";
		document.getElementById("N9").innerHTML="";
		document.getElementById("N10").innerHTML="";
		document.getElementById("N11").innerHTML="";
	}
	else{
		var n1="",n2="",n3="",n4="",n5="",n6="",n7="",n8="",n9="",n10="",n11="";
		for(i=0;i<grades.length;i++){
			if(grades[i]<=MAX && grades[i]>=AU)
				n1+="O";
			else if(grades[i]<AU && grades[i]>=A)
				n2+="O";
			else if(grades[i]<A && grades[i]>=AD)
				n3+="O";
			else if(grades[i]<AD && grades[i]>=BU)
				n4+="O";
			else if(grades[i]<BU && grades[i]>=B)
				n5+="O";
			else if(grades[i]<B && grades[i]>=BD)
				n6+="O";
			else if(grades[i]<BD && grades[i]>=CU)
				n7+="O";
			else if(grades[i]<CU && grades[i]>=C)
				n8+="O";
			else if(grades[i]<C && grades[i]>=CD)
				n9+="O";
			else if(grades[i]<CD && grades[i]>=D)
				n10+="O";
			else if(grades[i]<D && grades[i]>=F)
				n11+="O";
		}
		document.getElementById("N1").innerHTML=n1;
		document.getElementById("N2").innerHTML=n2;
		document.getElementById("N3").innerHTML=n3;
		document.getElementById("N4").innerHTML=n4;
		document.getElementById("N5").innerHTML=n5;
		document.getElementById("N6").innerHTML=n6;
		document.getElementById("N7").innerHTML=n7;
		document.getElementById("N8").innerHTML=n8;
		document.getElementById("N9").innerHTML=n9;
		document.getElementById("N10").innerHTML=n10;
		document.getElementById("N11").innerHTML=n11;
	}

}
