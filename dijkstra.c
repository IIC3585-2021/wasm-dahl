// El código está FUERTEMENTE basado en este https://www.thecrazyprogrammer.com/2017/05/travelling-salesman-problem.html

#include<stdio.h>

#define MAX 4
 
int ary[MAX][MAX],completed[MAX],n,cost;
 
int least(int c, int** ary)
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

void mincost(int city, int* memoria, int k,int** ary)
{
	int i, ncity;
 
	completed[city]=1;
 
	printf("%d--->",city+1);
	memoria[k] = city+1;
	ncity = least(city, ary);
 
	if(ncity==999)
	{
		ncity=0;
		printf("%d",ncity+1);
		cost+=ary[city][ncity];
 
		return;
	}
 
	mincost(ncity, memoria, k+1, ary);
	memoria[0] = cost;
}
 
int dijkstra(int* memoria, int** ary, int dimension)
{
	cost = 0;
	n = dimension;
	int i;
	for(i=0;i < n;i++)
	{
		completed[i]=0;
	} 
 
	printf("\n\nThe Path is:\n");
	mincost(0, memoria, 1,ary); //passing 0 because starting vertex
 
	printf("\n\nMinimum cost is %d\n ",cost);
 

	return 0;
}