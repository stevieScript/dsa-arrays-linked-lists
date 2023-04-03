/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
      let newNode = new Node(val);
      if (!this.head) {
        this.head = newNode;
        this.tail = this.head;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
  
      this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
      let newNode = new Node(val);
      if (this.length === 0) {
          this.head = newNode;
          this.tail = newNode;
      }
      else {
          newNode.next = this.head;
          this.head = newNode;
      }
      this.length++;
      return this;
  }

  /** pop(): return & remove last item. */

  pop() {
      if (this.length === 0) return undefined;
      let current = this.head;
      let newTail = current;
      while (current.next) {
          newTail = current;
          current = current.next;
      }
      this.tail = newTail;
      this.tail.next = null;
      this.length--;
      if (this.length === 0) {
          this.head = null;
          this.tail = null;
      }
      return current.val;
  }

  /** shift(): return & remove first item. */

  shift() {
      if (this.length === 0) return undefined;
      let currentHead = this.head;
      this.head = currentHead.next;
      this.length--;
      if (this.length === 0) {
          this.tail = null;
      }
      return currentHead.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
      if (idx < 0 || idx >= this.length) return null;
      let counter = 0;
      let current = this.head;
      while (counter !== idx) {
          current = current.next;
          counter++;
      }
      return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
      if (idx < 0 || idx >= this.length) return false;
      let current = this.head;
      let counter = 0;
      while (counter !== idx) {
          current = current.next;
          counter++;
      }
      current.val = val;
      return true;
  }

  findIdx(val) {
      let current = this.head;
      let counter = 0;
      while (current !== null && counter !== val) {
        counter++;
        current = current.next;
      }
      return current;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
      if ( idx > this.length || idx < 0 ) throw new Error("Index out of bounds");
      if (idx === 0) return this.unshift(val);
      if (idx === this.length) return this.push(val);

      let previousNode = this.findIdx(idx - 1);
      let newNode = new Node(val);
      newNode.next = previousNode.next;
     
      previousNode.next = newNode;
      this.length++;
      // return true;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
      if (idx < 0 || idx >= this.length) return undefined;
      if (idx === 0) return this.shift();
      if (idx === this.length - 1) return this.pop();

      let previousNode = this.getAt(idx - 1);
      let removed = previousNode.next;
      previousNode.next = removed.next;
      this.length--;
      return removed;
  }

  /** average(): return an average of all values in the list */

  average() {
      if (this.length === 0) return 0;
      let sum = 0;
      let current = this.head;
      while (current) {
          sum += current.val;
          current = current.next;
      }
      return sum / this.length;    
  }
}

module.exports = LinkedList;
