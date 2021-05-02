#include <stdio.h>
#include <stdlib.h>

#define INFINITY 9999
#define MAX 6
  
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

 for(i=0;i<n;i++)
		for(j=0;j<n;j++)
			if(G[i][j]==0)
				cost[i][j]=INFINITY;
			else
				cost[i][j]=G[i][j];
	
	//initialize pred[],distance[] and visited[]
	for(i=0;i<n;i++)
	{
		distance[i]=cost[startnode][i];
		pred[i]=startnode;
		visited[i]=0;
	}
	
	distance[startnode]=0;
	visited[startnode]=1;
	count=1;
	
	while(count<n-1)
	{
		mindistance=INFINITY;
		
		//nextnode gives the node at minimum distance
		for(i=0;i<n;i++)
			if(distance[i]<mindistance&&!visited[i])
			{
				mindistance=distance[i];
				nextnode=i;
			}
			
			//check if a better path exists through nextnode			
			visited[nextnode]=1;
			for(i=0;i<n;i++)
				if(!visited[i])
					if(mindistance+cost[nextnode][i]<distance[i])
					{
						distance[i]=mindistance+cost[nextnode][i];
						pred[i]=nextnode;
					}
		count++;
	}

  //Process* process = calloc(1, sizeof(Process));
  //int* arreglo = calloc(100, sizeof(int));

	//print the path and distance of each node
	for(i = 0; i < n; i++){
		if ( i != startnode)
		{
			printf("\nDistance of node%d=%d",i,distance[i]);
			printf("\nPath=%d",i);
			fprintf(fp, "\nPath=%d",i);

      memoria[i] = distance[i];
			
			j = i;
			do
			{
				j = pred[j];
				printf("<-%d",j);
			} while( j!= startnode);

      //arreglo[i] = distance[i];
		}
	}

  return 999;

}
