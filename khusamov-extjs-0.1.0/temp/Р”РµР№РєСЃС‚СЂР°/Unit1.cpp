﻿//---------------------------------------------------------------------------

#include <vcl.h>
#pragma hdrstop
#include <StrUtils.hpp>
#pragma package(smart_init)
#pragma resource "*.dfm"
const int N=6;         //количество вершин
int n=N;
int C[N][N];     //матрица стоимостей
int MAX=0;       //вместо бесконечности
#include "Unit1.h"
#include "Unit2.h"
TForm1 *Form1;

/* ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ */

void setMAX() {                                // вычисляем максимальный элемент матрицы
	int max=0;
	for (int i=0; i<N; i++) for (int j=0; j<N; j++)
		if (C[i][j]!=NULL && C[i][j]!=MAX) max=max+C[i][j];
	max=MAX=max*max;
}
int setMAX(int **S) {
	int max=0;
	for (int i=0; i<n; i++)
		for (int j=0; j<n; j++)
			max+=S[i][j];
	return max;
}
AnsiString frmt(AnsiString str,int c) {        // форматирование строки до нужного кол-ва символов
	int cc=c-str.Length();                 // НЕ ИМЕЕТ ОТНОШЕНИЯ К АЛГОРИТМУ ДЕЙКСТРЫ
	for (int i=0; i<cc; i++) str=" "+str;  // нужно просто для красоты
	return str;
}
bool in_arr(int j, int *arr) {                  // проверка на наличие числа j в массиве arr
	bool ret=false;
	for (int i=0; i<n-1; i++) if (arr[i]==j) ret=true;
	return ret;
}

//---------------------------------------------------------------------------
__fastcall TForm1::TForm1(TComponent* Owner)
        : TForm(Owner)
{
}
//---------------------------------------------------------------------------
void __fastcall TForm1::FormShow(TObject *Sender)
{
        StringGrid1->Cells[0][1]=1;
        StringGrid1->Cells[0][2]=2;
        StringGrid1->Cells[0][3]=3;
        StringGrid1->Cells[0][4]=4;
        StringGrid1->Cells[0][5]=5;
        StringGrid1->Cells[0][6]=6;
        StringGrid1->Cells[1][0]=1;
        StringGrid1->Cells[2][0]=2;
        StringGrid1->Cells[3][0]=3;
        StringGrid1->Cells[4][0]=4;
        StringGrid1->Cells[5][0]=5;
        StringGrid1->Cells[6][0]=6;
}
//---------------------------------------------------------------------------
void __fastcall TForm1::StringGrid1SetEditText(TObject *Sender, int ACol,
      int ARow, const AnsiString Value)
{
        if (TryStrToInt(Value,C[ARow-1][ACol-1])) C[ARow-1][ACol-1]=StrToInt(Value);
                else C[ARow-1][ACol-1]=NULL;
}
//---------------------------------------------------------------------------
void __fastcall TForm1::Button2Click(TObject *Sender)
{
        int a;
        if (CheckBox1->Checked) a=1;                   // определяем вершину источник
        if (CheckBox2->Checked) a=2;
        if (CheckBox3->Checked) a=3;
        if (CheckBox4->Checked) a=4;
        if (CheckBox5->Checked) a=5;
        if (CheckBox6->Checked) a=6;
        a=a-1;
        Memo1->Lines->Add("");
        Memo1->Lines->Add("АЛГОРИТМ ДЕЙКСТРЫ :");
	setMAX();
	AnsiString bufS,*bufD=new AnsiString[n],bufP;   // строки которые нужны для вывода результата на экран
	int *S=new int[n-1],*D=new int[n],              // массивы необходимые для алгоритма
		*P=new int[n],w,min;                    // массив S содержит вершины помеченые как посещённые
	for (int k=0; k<n-1; k++) {                     // массив D содержит кратчайшие расстояния к вергинам из вершины источника
		S[k]=-1;                                // Р - массив последних промежуточных вершин на маршруте
	}
	S[0]=a;
	for (int i=0; i<n; i++) {                       // начало алгоритма
		if (C[a][i]==NULL) D[i]=MAX;
			else D[i]=C[a][i];
		bufP=bufP+frmt(AnsiString((P[i]=a)+1),4);
		if (D[i]==MAX) bufD[0]=bufD[0]+"   ~";
			else bufD[0]=bufD[0]+frmt(AnsiString(D[i]),4);
	}
	for (int i=1; i<n-1; i++) {
		min=MAX;
		for (int k=0; k<n; k++) {
			if (D[k]<min && !in_arr(k,S) && k!=a) {
				w=k;
				min=D[k];
			}
		}
		if (min==MAX) break;
		bufS=bufD[i]=bufP="";
		S[i]=w;
		for (int j=0; j<n; j++) {
			if (!in_arr(j,S) && C[w][j]!=NULL && (D[w]+C[w][j])<=D[j]) {
				P[j]=w;
				D[j]=D[w]+C[w][j];
			}
			if (!in_arr(j,S) && D[j]<MAX) {
				bufD[i]=bufD[i]+frmt(AnsiString(D[j]),4);
			} else bufD[i]=bufD[i]+"   ~";
			bufP=bufP+frmt(AnsiString(P[j]+1),4);
		}
	}
	for (int k=0; k<n-1; k++) if (S[k]>-1) bufS=bufS+AnsiString(S[k]+1)+", ";
	Memo1->Lines->Add("S = "+bufS);
	Memo1->Lines->Add("D = ");
	for (int i=0; i<n; i++) {
		Memo1->Lines->Add(bufD[i]);
	}
	Memo1->Lines->Add("P = ");
	Memo1->Lines->Add(bufP);
		int prom;
	AnsiString str;                                                      
        Memo1->Lines->Add("");
	Memo1->Lines->Add("Кратчайшие маршруты:");
	for (int i=0; i<n; i++) {
		if (i!=a && C[P[i]][i]!=NULL) {
			str=AnsiString(i+1);
			prom=P[i];
			do {
				if (str!=AnsiString(i+1)) prom=P[prom];
				str=str+" >- "+AnsiString(prom+1);
			} while (prom!=a);
			Memo1->Lines->Add(ReverseString(str)+"   =   "+AnsiString(D[i]));
		}
	}
}
//---------------------------------------------------------------------------
void __fastcall TForm1::Button1Click(TObject *Sender)
{
        for (int i=0; i<6; i++) for (int j=0; j<6; j++) {
                C[i][j]=NULL;
                StringGrid1->Cells[i+1][j+1]="";
        }
        StringGrid1SetEditText(Sender,2,1,"10"); StringGrid1->Cells[2][1]=10;
        StringGrid1SetEditText(Sender,3,1,"30"); StringGrid1->Cells[3][1]=30;
        StringGrid1SetEditText(Sender,6,1,"100"); StringGrid1->Cells[6][1]=100;
        StringGrid1SetEditText(Sender,1,2,"10"); StringGrid1->Cells[1][2]=10;
        StringGrid1SetEditText(Sender,3,2,"80"); StringGrid1->Cells[3][2]=80;
        StringGrid1SetEditText(Sender,5,2,"50"); StringGrid1->Cells[5][2]=50;
        StringGrid1SetEditText(Sender,4,3,"40"); StringGrid1->Cells[4][3]=40;
        StringGrid1SetEditText(Sender,6,3,"10"); StringGrid1->Cells[6][3]=10;
        StringGrid1SetEditText(Sender,1,4,"30"); StringGrid1->Cells[1][4]=30;
        StringGrid1SetEditText(Sender,6,4,"60"); StringGrid1->Cells[6][4]=60;
        StringGrid1SetEditText(Sender,3,5,"70"); StringGrid1->Cells[3][5]=70;
        StringGrid1SetEditText(Sender,5,6,"20"); StringGrid1->Cells[5][6]=20;
}
//---------------------------------------------------------------------------
void __fastcall TForm1::Button7Click(TObject *Sender)
{
        Form2->Show();
}
//---------------------------------------------------------------------------

