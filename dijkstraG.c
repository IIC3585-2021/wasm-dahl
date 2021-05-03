#include <stdio.h>
#include <stdlib.h>

#define INFINITY 9999
#define MAX 6
int completed[MAX];
int cost = 0;



int least(int c, int** G)
{
	int i,nc=999;
	int min=999,kmin;
 
	for(i=0;i < MAX;i++)
	{
		if((G[c][i]!=0)&&(completed[i]==0))
			if(G[c][i]+G[i][c] < min)
			{
				min=G[i][0]+G[c][i];
				kmin=G[c][i];
				nc=i;
			}
	}
 
	if(min!=999)
		cost+=kmin;
 
	return nc;
}
 

void mincost(int city, int** G)
{
	int i,ncity;
 
	completed[city]=1;
 
	printf("%d--->",city+1);
	ncity=least(city, G);
 
	if(ncity==999)
	{
		ncity=0;
		printf("%d",ncity+1);
		cost+=G[city][ncity];
 
		return;
	}
 
	mincost(ncity, G);
}


int dijkstra(int * memoria, int** G)
{
  int n = 6;
  int startnode = 0;
 
	int cost[MAX][MAX],distance[MAX],pred[MAX];
	int visited[MAX],count,mindistance,nextnode,i,j;
	
	
//  int G[5][5];
	
	//pred[] stores the predecessor of each node
	//count gives the number of nodes seen so far
	//create the cost matrix
	/*G[0][0] = 0;
  G[0][1] = 10;
  G[0][2] = 0;
  G[0][3] = 30;
  G[0][4] = 100;

  G[1][0] = 10;
  G[1][1] = 0;
  G[1][2] = 50;
  G[1][3] = 0;
  G[1][4] = 0;

  G[2][0] = 0;
  G[2][1] = 50;
  G[2][2] = 0;
  G[2][3] = 20;
  G[2][4] = 10;

  G[3][0] = 30;
  G[3][1] = 0;
  G[3][2] = 20;
  G[3][3] = 0;
  G[3][4] = 60;

  G[4][0] = 100;
  G[4][1] = 0;
  G[4][2] = 10;
  G[4][3] = 60;
  G[4][4] = 0;
 printf("something"); 
*/

 for(i=0;i<n;i++){
	 completed[i] = 0;
 }
	mincost(0, G);
  return 999;
}