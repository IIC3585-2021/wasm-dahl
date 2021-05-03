#include<stdio.h>

#define MAX 4
 
int ary[MAX][MAX],completed[MAX],n,cost=0;
 
void takeInput()
{
	int i,j;
 
	n = MAX;
 
	for(i=0;i < n;i++)
	{
		completed[i]=0;
	} 

    ary[0][0] = 0;
    ary[0][1] = 4;
    ary[0][2] = 1;
    ary[0][3] = 3;

    ary[1][0] = 4;
    ary[1][1] = 0;
    ary[1][2] = 2;
    ary[1][3] = 1;

    ary[2][0] = 1;
    ary[2][1] = 2;
    ary[2][2] = 0;
    ary[2][3] = 5;

    ary[3][0] = 3;
    ary[3][1] = 1;
    ary[3][2] = 5;
    ary[3][3] = 0;

}

int least(int c)
{
	int i,nc=999;
	int min=999,kmin;
 
	for(i=0;i < n;i++)
	{
		if((ary[c][i]!=0)&&(completed[i]==0))
			if(ary[c][i]+ary[i][c] < min)
			{
				min=ary[i][0]+ary[c][i];
				kmin=ary[c][i];
				nc=i;
			}
	}
 
	if(min!=999)
		cost+=kmin;
 
	return nc;
}

void mincost(int city, int* memoria, int k)
{
	int i, ncity;
 
	completed[city]=1;
 
	printf("%d--->",city+1);
	memoria[k] = city+1;
	ncity = least(city);
 
	if(ncity==999)
	{
		ncity=0;
		printf("%d",ncity+1);
		cost+=ary[city][ncity];
 
		return;
	}
 
	mincost(ncity, memoria, k+1);
	memoria[0] = cost;
}
 
int dijkstra(int* memoria)
{
	takeInput();
 
	printf("\n\nThe Path is:\n");
	mincost(0, memoria, 1); //passing 0 because starting vertex
 
	printf("\n\nMinimum cost is %d\n ",cost);
 
	return 0;
}