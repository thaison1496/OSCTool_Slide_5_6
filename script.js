console.log("Hello");

getColor = function(arr){
	m = arr.length;
	n = arr[0].length;
	color = [];
	for(var i = 0; i < m; i++){
		color.push([]);
		for(var j = 0; j < n; j++)
			color[i].push(false);
	}
	for(var i = 0; i < m; i++)
		for(var j = 1; j < n; j++){
			color[i][j] = false;
			flag = true;
			for(var k = 0; k < m; k++)
				if (arr[k][j-1] == arr[i][j])
					flag = false;
			if (flag) color[i][j] = true;
		}

	for(var i = 0; i < m; i++){
		for(var j = 0; j < n; j++)
			arr[i][j] = {value: arr[i][j], color: color[i][j]};
	}
	arr[0][0].color = true;
	return arr;
}

refractor = function(arr){
	m = arr.length;
	n = arr[0].length;
	r = [];
	for(var i = 0; i < n; i ++){
		r.push([]);
		for(var j = 0; j < m; j ++){
			temp = arr[j][i].toString();
			if (temp == '-1')
				temp = '   _';
			else
				while(temp.length < 4) temp = ' ' + temp;
			r[i].push(temp);
		}
	}
	return r;
}

FIFO = function(pages, nframe){
	n = pages.length;
	pt = [[]];
	queue = [];
	qb = 0;

	for (var i = 0; i < nframe; i++) {
		pt[0].push(-1);
	}
	for (var i = 0; i < n; i++){
		//console.log(pt);
		if (i != 0){
			pt.push([]);
			for(var j = 0; j < nframe; j++)
				pt[i][j] = pt[i-1][j];
		}
		
		if (pt[i].indexOf(pages[i]) == -1){
			queue.push(pages[i]);
			flag = false;
			for (var j = 0; j < nframe; j++) 
				if (pt[i][j] == -1){
					flag = true;
					pt[i][j] = pages[i];
					break;
				}	
			if (flag) continue;
			pt[i][ pt[i].indexOf(queue[qb]) ] = pages[i];
			qb ++ ;
		}
	}
	return pt;
};

optimal = function(pages, nframe){
	n = pages.length;
	pt = [[]];

	for (var i = 0; i < nframe; i++) {
		pt[0].push(-1);
	}
	for (var i = 0; i < n; i++){
		//console.log(pt);
		if (i != 0){
			pt.push([]);
			for(var j = 0; j < nframe; j++)
				pt[i][j] = pt[i-1][j];
		}
		
		if (pt[i].indexOf(pages[i]) == -1){
			flag = false;
			next = [];
			for (var j = 0; j < nframe; j++) {
				if (pt[i][j] == -1){
					flag = true;
					pt[i][j] = pages[i];
					break;
				}	
				next.push(n);
				for(var k = i + 1; k < n; k++)
					if (pt[i][j] == pages[k]){
						next[j] = k;	
						break;
					}
			}
			if (flag) continue;
			r = 0;
			//console.log(i);
			//console.log(pt[i]);
			//console.log(next);
			for(var j = 1; j < nframe; j++)
				if (next[j] > next[r])
					r = j;
			pt[i][r] = pages[i];
		}
	}
	return pt;
};

LRU = function(pages, nframe){
	n = pages.length;
	pt = [[]];

	for (var i = 0; i < nframe; i++) {
		pt[0].push(-1);
	}
	for (var i = 0; i < n; i++){
		//console.log(pt);
		if (i != 0){
			pt.push([]);
			for(var j = 0; j < nframe; j++)
				pt[i][j] = pt[i-1][j];
		}
		
		if (pt[i].indexOf(pages[i]) == -1){
			flag = false;
			prev = [];
			for (var j = 0; j < nframe; j++) {
				if (pt[i][j] == -1){
					flag = true;
					pt[i][j] = pages[i];
					break;
				}	
				prev.push(-1);
				for(var k = i - 1; k >= 0; k--)
					if (pt[i][j] == pages[k]){
						prev[j] = k;	
						break;
					}
			}
			if (flag) continue;
			r = 0;
			//console.log(i);
			//console.log(pt[i]);
			//console.log(next);
			for(var j = 1; j < nframe; j++)
				if (prev[j] < prev[r])
					r = j;
			pt[i][r] = pages[i];
		}
	}
	return pt;
};

LFU = function(pages, nframe){
	n = pages.length;
	pt = [[]];
	ct = [];
	for(var i = 0; i < 100; i++)
		ct.push(0);

	for (var i = 0; i < nframe; i++) {
		pt[0].push(-1);
	}
	for (var i = 0; i < n; i++){
		//console.log(pt);
		ct[pages[i]] += 1;
		if (i != 0){
			pt.push([]);
			for(var j = 0; j < nframe; j++)
				pt[i][j] = pt[i-1][j];
		}
		
		if (pt[i].indexOf(pages[i]) == -1){
			flag = false;
			prev = [];
			for (var j = 0; j < nframe; j++) {
				if (pt[i][j] == -1){
					flag = true;
					pt[i][j] = pages[i];
					break;
				}	
			}
			if (flag) continue;
			r = 0;
			for(var j = 1; j < nframe; j++)
				if (ct[pt[i][j]] < ct[pt[i][r]])
					r = j;
			pt[i][r] = pages[i];
		}
	}
	return pt;
};

MFU = function(pages, nframe){
	n = pages.length;
	pt = [[]];
	ct = [];
	for(var i = 0; i < 100; i++)
		ct.push(0);

	for (var i = 0; i < nframe; i++) {
		pt[0].push(-1);
	}
	for (var i = 0; i < n; i++){
		//console.log(pt);
		ct[pages[i]] += 1;
		if (i != 0){
			pt.push([]);
			for(var j = 0; j < nframe; j++)
				pt[i][j] = pt[i-1][j];
		}
		
		if (pt[i].indexOf(pages[i]) == -1){
			flag = false;
			prev = [];
			for (var j = 0; j < nframe; j++) {
				if (pt[i][j] == -1){
					flag = true;
					pt[i][j] = pages[i];
					break;
				}	
			}
			if (flag) continue;
			r = 0;
			for(var j = 1; j < nframe; j++)
				if (ct[pt[i][j]] > ct[pt[i][r]])
					r = j;
			pt[i][r] = pages[i];
		}
	}
	return pt;
};


clock = function(pages, nframe){
	n = pages.length;
	pt = [[]];
	clock = [];
	head = 0;

	for(var i = 0; i < nframe; i++)
		clock.push(0);

	for (var i = 0; i < nframe; i++) {
		pt[0].push(-1);
	}
	for (var i = 0; i < n; i++){
		if (i != 0){
			pt.push([]);
			for(var j = 0; j < nframe; j++)
				pt[i][j] = pt[i-1][j];
		}
		
		if (pt[i].indexOf(pages[i]) == -1){
			flag = false;
			prev = [];
			for (var j = 0; j < nframe; j++) {
				if (pt[i][j] == -1){
					flag = true;
					pt[i][j] = pages[i];
					break;
				}	
			}
			if (flag) continue;
			//console.log(i,head);
			do {
				if (clock[head] == 0){
					pt[i][head] = pages[i];
					head = (head + 1) % nframe;
					break;
				}
				clock[head] = 0;
				head += 1;
				if (head == nframe)
					head = 0;
			}
			while (true);
		}
		else {
			clock[pages[i]] = 1;
		}
	}
	return pt;
};


pageReplacementAlgos = function(refStr, $scope){
	refStr = refStr.replace(/,/g,' ');
	pages = refStr.split(/ +/);
	for(var i = pages.length - 1; i >= 0; i--){
		if (pages[i] != '0' && !parseInt(pages[i]))
			pages.splice(i,1);
		else
			pages[i] = parseInt(pages[i]);
	}
	console.log(pages.length);
	$scope.pages = pages;
	$scope.algos.FIFO = getColor( refractor( FIFO(pages, $scope.nframe) ) );
	$scope.algos.Optimal = getColor( refractor( optimal(pages, $scope.nframe) ) );
	$scope.algos.LRU = getColor( refractor( LRU(pages, $scope.nframe) ) );
	$scope.algos.LFU = getColor( refractor( LFU(pages, $scope.nframe) ) );
	$scope.algos.MFU = getColor( refractor( MFU(pages, $scope.nframe) ) );
	$scope.algos.clock = getColor( refractor( clock(pages, $scope.nframe) ) );
};

obj = {
	'addrTran': {
		'base': 0,
		'limit': 0,
		'ref': 0
	},
	'EAT': {
		'hitRate': 0,
		'lookupTime': 0,
		'memAccessTime': 0
	},
	'refStr': '1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5',
	'nframe': 3,
	'algos': {},
	'algoNames': ["FIFO","Optimal","LRU","LFU","MFU","clock"]
}

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
	for (var i in obj)
		$scope[i] = obj[i];
	$scope.calculate = function(refStr){
		pageReplacementAlgos(refStr, $scope);
	}
});