function BinaryTree(){
	// unordered
	// add into
	// get the parent
	// add to while iterating over
	// get the current level
	this.tree = [];
	
	this.push = function(val){
		this.tree.push(val);
	}
	this.left = function(i){
		return 2*i + 1;
	}
	this.right = function(i){
		return 2*i + 2;
	}
	this.parent = function(i){
		return (i-1)/2;
	}

}